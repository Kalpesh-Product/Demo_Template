import * as yup from "yup";

const enquirySchema = yup.object({
  companyName: yup.string().trim().required("Please provide the company name"),
  companyType: yup.string().trim().required("Please provide the company type"),
  fullName: yup
    .string()
    .trim()
    .min(1, "Please provide a valid name")
    .required("Please provide your full name"),
  personelCount: yup
    .number()
    .typeError("Personnel count must be a number")
    .integer("Personnel count must be an integer")
    .min(1, "Personnel count must be at least 1")
    .required("Please provide the personnel count"),
  email: yup
    .string()
    .trim()
    .email("Please provide a valid email address")
    .required("Please provide your email"),
  phone: yup
    .string()
    .trim()
    .matches(/^\+?[0-9]{7,15}$/, "Please provide a valid phone number")
    .required("Please provide your phone number"),
  startDate: yup
    .date()
    .typeError("Please provide a valid start date")
    .required("Please provide the start date"),
  endDate: yup
    .date()
    .typeError("Please provide a valid end date")
    .min(yup.ref("startDate"), "End date cannot be before the start date")
    .required("Please provide the end date"),
  country: yup.string().trim().nullable(),
  state: yup.string().trim().nullable(),
  sheetName: yup.string().required("Please provide a sheet name"),
});

const pocSchema = yup.object().shape({
  pocName: yup
    .string()
    .min(1, "Please provide a valid name")
    .required("Please provide the POC name"),
  pocCompany: yup.string().required("Please provide the POC company name"),
  pocDesignation: yup.string().required("Please provide the POC designation"),
  fullName: yup.string().required("Please provide your full name"),
  mobile: yup
    .string()
    .trim()
    .matches(/^\+?[0-9]{7,15}$/, "Please provide a valid mobile number")
    .required("Please provide the mobile"),
  email: yup
    .string()
    .trim()
    .email("Please provide a valid email address")
    .required("Please provide your email"),
  sheetName: yup.string().required("Please provide a sheet name"),
});

const connectWithUsSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Please provide your valid full name.")
    .required("Please provide your full name."),
  email: yup
    .string()
    .email("Please provide a valid email.")
    .required("Please provide your email."),
  mobile: yup.string().trim().required("Please provide the mobile"),
  typeOfPartnerShip: yup
    .string()
    .required("Please provide the type of partnership."),
  message: yup.string().required("Please provide a brief messsage."),
  sheetName: yup.string().required("Please provide a sheet name"),
});

const nomadsSignupSchema = yup.object().shape({
  firstName: yup.string().required("Please provide your first name"),
  lastName: yup.string().required("Please provide your last name"),
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Please provide your email"),
  password: yup.string().optional(),
  mobile: yup.string().trim().required("Please provide the mobile"),
  country: yup.string().required("Please provide your country name"),
  sheetName: yup.string().required("Please provide a sheet name"),
  reason: yup.string().required("Please provide the reason"),
});

function toISODateOnly(v) {
  if (!v) return "";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export const addB2CformSubmission = async (req, res, next) => {
  try {
    const { B2C_APPS_SCRIPT_URL } = process.env;
    if (!B2C_APPS_SCRIPT_URL) {
      throw new Error("B2C_APPS_SCRIPT_URL is not configured");
    }

    const { sheetName } = req.body;

    // Configuration for each sheet type
    const sheetConfig = {
      All_Enquiry: {
        schema: enquirySchema,
        map: (d) => ({
          companyName: d.companyName,
          verticalType: d.companyType,
          country: d.country || "",
          state: d.state || "",
          fullName: d.fullName,
          noOfPeople: d.personelCount,
          mobileNumber: d.phone,
          email: d.email,
          startDate: toISODateOnly(d.startDate),
          endDate: toISODateOnly(d.endDate),
          sheetName: d.sheetName,
        }),
        successMsg: "Enquiry added successfully",
      },
      All_POC_Contact: {
        schema: pocSchema,
        map: (d) => ({
          pocName: d.pocName,
          pocCompany: d.pocCompany,
          pocDesignation: d.pocDesignation,
          fullName: d.fullName,
          mobile: d.mobile,
          email: d.email,
          sheetName: d.sheetName,
        }),
        successMsg: "POC added successfully",
      },
      Connect_with_us: {
        schema: connectWithUsSchema,
        map: (d) => ({
          name: d.name,
          email: d.email,
          mobile: d.mobile,
          typeOfPartnerShip: d.typeOfPartnerShip,
          message: d.message,
          sheetName: d.sheetName,
        }),
        successMsg: "A new contact enquiry added successfully.",
      },
      Sign_up: {
        schema: nomadsSignupSchema,
        map: (d) => ({
          firstName: d.firstName?.trim(),
          lastName: d.lastName?.trim(),
          email: d.email?.trim(),
          password: d.password, 
          country: d.country?.trim(),
          mobile: d.mobile?.trim(),
          reason: d.reason || "",
          sheetName: d.sheetName,
          submittedAt: new Date(),
        }),
        successMsg: "Sign-up saved successfully.",
      },
    };

    const config = sheetConfig[sheetName];
    if (!config) {
      throw new Error(`Unsupported sheet name: ${sheetName}`);
    }

    // Validate request
    const validatedData = await config.schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    // Build payload
    const payload = config.map(validatedData);

    // Send to Google Apps Script
    const response = await fetch(B2C_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Failed to save data to Google Sheets");
    }

    res.status(201).json({
      status: "success",
      message: config.successMsg,
      data: payload,
    });
  } catch (err) {
    next(err);
  }
};
