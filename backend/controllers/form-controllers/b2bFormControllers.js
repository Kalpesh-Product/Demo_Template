import { uploadFileToS3 } from "../../config/s3Config.js";
import { randomUUID } from "crypto";
import yup from "yup";

const istNowPieces = () => {
  const tz = "Asia/Kolkata";
  const now = new Date();
  // en-CA -> yyyy-mm-dd
  const submissionDate = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  // 24h HH:mm:ss
  const submissionTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(now)
    .replace(/\u202F/g, ""); // fix narrow no-break space on some Node versions

  return { submissionDate, submissionTime };
};

const jobApplicationSchema = yup
  .object({
    jobPosition: yup.string().trim().required("Job Position is required"),
    name: yup.string().trim().required("Name is required"),
    email: yup.string().trim().email().required("Valid email is required"),
    dob: yup
      .string()
      .trim()
      .nullable()
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Date of Birth must be YYYY-MM-DD (use 0-padding)"
      ),
    mobile: yup
      .string()
      .trim()
      .required("Mobile Number is required")
      .matches(/^[0-9+\-\s()]{8,20}$/, "Invalid mobile number"),
    location: yup.string().trim().required("Location is required"),
    experienceYears: yup
      .number()
      .typeError("Experience (in years) must be a number")
      .min(0)
      .max(60)
      .required("Experience (in years) is required"),
    linkedin: yup.string().trim().url().nullable(),
    currentMonthlySalary: yup
      .number()
      .typeError("Current Monthly Salary must be a number")
      .min(0)
      .nullable(),
    expectedMonthlySalary: yup
      .number()
      .typeError("Expected Monthly Salary must be a number")
      .min(0)
      .nullable(),
    joinInDays: yup
      .string()
      .typeError("How Soon You Can Join (Days) must be a number")
      .min(0)
      .required("Join-in days is required"),
    relocateGoa: yup
      .string()
      .trim()
      .oneOf(["Yes", "No"], "Relocate must be 'Yes' or 'No'")
      .required("Relocate to Goa is required"),
    personality: yup.string().trim().required("Tell us about yourself"),
    skills: yup.string().trim().required("Skills are required"),
    whyConsider: yup
      .string()
      .trim()
      .required("Why should we consider you is required"),
    willingToBootstrap: yup
      .string()
      .trim()
      .required("Willing to bootstrap is required"),
    message: yup.string().trim().nullable(),
    remarks: yup.string().trim().default(""),
    submissionDate: yup
      .string()
      .trim()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Submission Date must be YYYY-MM-DD")
      .optional(),
    submissionTime: yup
      .string()
      .trim()
      .matches(/^\d{2}:\d{2}:\d{2}$/, "Submission Time must be HH:mm:ss")
      .optional(),
  })
  .noUnknown(true, "Unknown field in payload");

const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  mobile: yup.string().required("Mobile number is required"),

  country: yup.string().trim().required("Country is required"),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().required("State is required"),

  companyName: yup.string().trim().required("Company Name is required"),
  industry: yup.string().trim().required("Industry is required"),

  companySize: yup.string().trim().required("Company Size is required"),

  companyType: yup.string().trim().required("Company Type is required"),

  companyCity: yup.string().trim().required("Company City is required"),
  companyState: yup.string().trim().required("Company State is required"),

  websiteUrl: yup
    .string()
    .trim()
    .url("Invalid Website URL")
    .nullable()
    .notRequired(),

  linkedInUrl: yup
    .string()
    .trim()
    .url("Invalid LinkedIn URL")
    .nullable()
    .notRequired(),

  selectedServices: yup
    .array()
    .of(yup.string().trim())
    .min(1, "Select at least one service")
    .required("Selected Services is required"),

  formName: yup.string().trim().required("Form Name is required"),
});

const enquirySchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  mobile: yup
    .string()
    .trim()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

  partnerstype: yup.string().trim().required("Partner Type is required"),

  message: yup
    .string()
    .trim()
    .required("Message is required")
    .min(5, "Message must be at least 5 characters long"),

  formName: yup.string().trim().required("Form Name is required"),
});

export const addB2BFormSubmission = async (req, res, next) => {
  const url = process.env.B2B_APPS_SCRIPT_URL;
  if (!url) {
    return res
      .status(500)
      .json({ error: "Server misconfiguration: Web App URL not set" });
  }

  // --- shared helpers -------------------------------------------------------

  const validate = async (schema, body) => {
    return schema.validate(body, { abortEarly: false, stripUnknown: true });
  };

  const addIstSubmissionStampsIfMissing = (payload) => {
    const { submissionDate, submissionTime } = istNowPieces();
    if (!payload.submissionDate) payload.submissionDate = submissionDate;
    if (!payload.submissionTime) payload.submissionTime = submissionTime;
    return payload;
  };

  const parseAppsScriptResponse = async (resp) => {
    // Try JSON first; if not JSON, return raw text in a wrapper
    const text = await resp.text();
    try {
      return { ok: resp.ok, data: JSON.parse(text) };
    } catch {
      return { ok: resp.ok, data: { raw: text } };
    }
  };

  const postToAppsScript = async (body) => {
    const signal =
      typeof AbortSignal?.timeout === "function"
        ? AbortSignal.timeout(15_000)
        : undefined;

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });

    const { ok, data } = await parseAppsScriptResponse(resp);
    if (!ok || data?.error) {
      const detail = data?.error || data?.raw || "Unknown upstream error";
      const err = new Error("Upstream write failed");
      err.status = 502;
      err.detail = detail;
      throw err;
    }
    return data;
  };

  // --- individual form handlers --------------------------------------------

  const handleJobApplication = async () => {
    // 1) validate + coerce
    const payload = await validate(jobApplicationSchema, req.body);

    // 2) ensure IST stamps if missing
    addIstSubmissionStampsIfMissing(payload);

    // 3) optional resume upload
    let resumeLink = "";
    if (req.file) {
      resumeLink = await uploadFileToS3(
        `job-applications/${payload.jobPosition}/${
          payload.name + randomUUID()
        }/${req.file.originalname}`,
        req.file
      );
    }

    // 4) forward to Apps Script
    const apsBody = {
      formName: "jobApplication",
      jobPosition: payload.jobPosition,
      name: payload.name,
      email: payload.email,
      dob: payload.dob ?? "",
      mobile: payload.mobile,
      location: payload.location,
      experienceYears: payload.experienceYears,
      linkedin: payload.linkedin ?? "",
      currentMonthlySalary: payload.currentMonthlySalary ?? "",
      expectedMonthlySalary: payload.expectedMonthlySalary ?? "",
      joinInDays: payload.joinInDays,
      relocateGoa: payload.relocateGoa,
      personality: payload.personality,
      skills: payload.skills,
      whyConsider: payload.whyConsider,
      willingToBootstrap: payload.willingToBootstrap,
      message: payload.message ?? "",
      submissionDate: payload.submissionDate,
      submissionTime: payload.submissionTime,
      resumeLink,
      remarks: payload.remarks ?? "",
    };

    await postToAppsScript(apsBody);

    // 5) response
    return res.status(201).json({
      message: "Application submitted",
      submissionDate: payload.submissionDate,
      submissionTime: payload.submissionTime,
    });
  };

  const handleRegister = async () => {
    const payload = await validate(registrationSchema, req.body);

    const apsBody = {
      name: payload.name,
      email: payload.email,
      mobile: payload.mobile,
      country: payload.country,
      city: payload.city,
      state: payload.state,
      companyName: payload.companyName,
      industry: payload.industry,
      companySize: payload.companySize,
      companyType: payload.companyType,
      companyCity: payload.companyCity,
      companyState: payload.companyState,
      websiteURL: payload.websiteUrl,
      linkedinURL: payload.linkedInUrl,
      selectedServices: payload.selectedServices,
      formName: "register",
    };

    const result = await postToAppsScript(apsBody);
    return res.json(result);
  };

  const handleEnquiry = async () => {
    const payload = await validate(enquirySchema, req.body);

    const apsBody = {
      name: payload.name,
      email: payload.email,
      mobile: payload.mobile,
      partnerstype: payload.partnerstype,
      message: payload.message,
      formName: "connect",
    };

    const result = await postToAppsScript(apsBody);
    return res.json(result);
  };

  // --- router-like dispatch -------------------------------------------------

  try {
    const formName = req.body?.formName;

    const handlers = {
      jobApplication: handleJobApplication,
      register: handleRegister,
      connect: handleEnquiry,
    };

    if (!formName || !handlers[formName]) {
      return res.status(400).json({
        error: "Unsupported form",
        detail: `Expected one of: ${Object.keys(handlers).join(", ")}`,
      });
    }

    await handlers[formName]();
  } catch (err) {
    // unify schema (ValidationError) shape -> { field: message }
    if (err?.name === "ValidationError") {
      const errors = err.inner?.length
        ? err.inner.reduce((acc, e) => {
            if (e.path && !acc[e.path]) acc[e.path] = e.message;
            return acc;
          }, {})
        : { message: err.message };
      return res.status(400).json({ error: "Validation failed", errors });
    }

    // bubble known upstream failures with status if provided
    if (err?.status === 502) {
      return res
        .status(502)
        .json({ error: "Upstream write failed", detail: err.detail });
    }

    return next(err);
  }
};
