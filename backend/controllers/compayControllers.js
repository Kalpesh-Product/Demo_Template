import Company from "../models/Company.js";
import Review from "../models/Reviews.js";
import PointOfContact from "../models/PointOfContact.js";
import { Readable } from "stream";
import csvParser from "csv-parser";
import { uploadFileToS3 } from "../config/s3Config.js";

export const bulkInsertCompanies = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ message: "Please provide a valid CSV file" });
    }

    const companies = [];

    const stream = Readable.from(file.buffer.toString("utf-8").trim());
    stream
      .pipe(csvParser())
      .on("data", (row) => {
        const company = {
          businessId: row["Business ID"]?.trim(),
          companyName: row["Business Name"]?.trim(),
          registeredEntityName: row["Registered Entity name"]?.trim(),
          website: row["Website"]?.trim() || null,
          address: row["Address"]?.trim(),
          city: row["City"]?.trim(),
          state: row["State"]?.trim(),
          country: row["Country"]?.trim(),
          about: row["About"]?.trim(),
          totalSeats: parseInt(row["Total Seats"]?.trim()) || null,
          latitude: parseFloat(row["latitude"]?.trim()),
          longitude: parseFloat(row["longitude"]?.trim()),
          googleMap: row["Google map"]?.trim() || null,
          ratings: parseFloat(row["Ratings"]) || 0,
          totalReviews: parseInt(row["Total Reviews"]?.trim()) || 0,
          inclusions: row["Inclusions"]?.trim(),
          services: row["Services"]?.trim(),
          units: row["Units"]?.trim(),
          companyType: row["Type"]?.trim()?.split(" ").length
            ? row["Type"]?.trim()?.split(" ").join("").toLowerCase()
            : row["Type"]?.trim()?.toLowerCase(),
        };
        companies.push(company);
      })
      .on("end", async () => {
        try {
          const result = await Company.insertMany(companies);

          const insertedCount = result.length;
          const failedCount = companies.length - insertedCount;

          res.status(200).json({
            message: "Bulk insert completed",
            total: companies.length,
            inserted: insertedCount,
            failed: failedCount,
          });
        } catch (insertError) {
          if (insertError.name === "BulkWriteError") {
            const insertedCount = insertError.result?.nInserted || 0;
            const failedCount = companies.length - insertedCount;

            res.status(200).json({
              message: "Bulk insert completed with partial failure",
              total: companies.length,
              inserted: insertedCount,
              failed: failedCount,
              writeErrors: insertError.writeErrors?.map((e) => ({
                index: e.index,
                errmsg: e.errmsg,
                code: e.code,
                op: e.op,
              })),
            });
          } else {
            res.status(500).json({
              message: "Unexpected error during bulk insert",
              error: insertError.message,
            });
          }
        }
      });
  } catch (error) {
    next(error);
  }
};

export const getCompaniesData = async (req, res, next) => {
  try {
    const companies = await Company.find().lean().exec();
    const reviews = await Review.find().lean().exec();
    const poc = await PointOfContact.find().lean().exec();

    const { country, state, type } = req.query;

    // Base company dataset with reviews and active POC
    const enrichCompanies = (base) => {
      return base.map((company) => ({
        ...company,
        reviews: reviews.filter(
          (review) => review.company.toString() === company._id.toString()
        ),
        poc: poc
          .filter((p) => p.company._id.toString() === company._id.toString())
          .find((p) => p.isActive),
      }));
    };

    let filteredCompanies = [];

    // 1. Filter by all three: type + country + state
    if (type && country && state) {
      filteredCompanies = companies.filter(
        (company) =>
          company.companyType === type?.toLowerCase() &&
          company.country?.toLowerCase() === country.toLowerCase() &&
          company.state?.toLowerCase() === state.toLowerCase()
      );
    }
    // 2. Filter only by type
    else if (type) {
      filteredCompanies = companies.filter(
        (company) => company.companyType === type
      );
    }
    // 3. Filter only by country and state
    else if (country && state) {
      filteredCompanies = companies.filter(
        (company) =>
          company.country?.toLowerCase() === country.toLowerCase() &&
          company.state?.toLowerCase() === state.toLowerCase()
      );
    }
    // 4. No filters → all companies
    else {
      filteredCompanies = companies;
    }

    const companyData = enrichCompanies(filteredCompanies);

    res.status(200).json(companyData);
  } catch (error) {
    next(error);
  }
};

export const getCompanyData = async (req, res, next) => {
  try {
    const { companyId } = req.params;

    const [companyData, reviews, poc] = await Promise.all([
      Company.findById(companyId).lean().exec(),
      Review.find({ company: companyId }).lean().exec(),
      PointOfContact.findOne({ company: companyId, isActive: true })
        .lean()
        .exec(),
    ]);

    if (!companyData) {
      return res.status(404).json({ error: "Company not found" });
    }

    return res.status(200).json({
      ...companyData, // base fields on the top level
      reviews, // array
      poc, // object or null
    });
  } catch (error) {
    // Log it so you’re not debugging in the dark at 2 AM
    console.error("getCompanyData error:", error);
    next(error);
  }
};

export const getUniqueDataLocations = async (req, res, next) => {
  try {
    const companies = await Company.find().lean().exec();

    const countryMap = new Map();

    for (const company of companies) {
      const country = company.country;
      const state = company.state;

      if (!countryMap.has(country)) {
        countryMap.set(country, new Set()); // use Set for unique states
      }
      countryMap.get(country).add(state);
    }

    const finalizedLocations = Array.from(countryMap.entries()).map(
      ([country, statesSet]) => ({
        country,
        states: Array.from(statesSet), // convert Set to array
      })
    );

    return res.status(200).json(finalizedLocations);
  } catch (error) {
    next(error);
  }
};

export const addCompanyImage = async (req, res, next) => {
  try {
    const file = req.file;
    const { type = "", companyId, businessId, companyType = "" } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const normalizedType = String(type).toLowerCase();
    if (!["logo", "image", "images"].includes(normalizedType)) {
      return res
        .status(400)
        .json({ message: "Invalid type. Use 'logo' or 'image'." });
    }

    let company;
    if (companyId) {
      company = await Company.findById(companyId).exec();
    } else if (businessId) {
      company = await Company.findOne({ businessId }).exec();
    } else {
      return res
        .status(400)
        .json({ message: "Provide companyId or businessId" });
    }

    if (!company) {
      return res.status(404).json({ message: "No such company found" });
    }

    if (
      companyType &&
      company.companyType?.toLowerCase() !== companyType.toLowerCase()
    ) {
      return res
        .status(400)
        .json({ message: "companyType does not match the stored company" });
    }

    const formatCompanyType = (type) => {
      const map = {
        hostel: "hostels",
        privatestay: "private-stay",
        meetingroom: "meetingroom",
        coworking: "coworking",
        cafe: "cafe",
        coliving: "coliving",
        workation: "workation",
      };

      const key = String(type || "").toLowerCase();
      return map[key] || "unknown";
    };

    const folderType = normalizedType === "logo" ? "logo" : "images";
    const pathCompanyType = formatCompanyType(
      companyType || company.companyType
    );

    const safeCompanyName =
      (company.companyName || "unnamed").replace(/[^\w\- ]+/g, "").trim() ||
      "unnamed";

    const folderPath = `nomads/${pathCompanyType}/${company.country}/${safeCompanyName}`;
    const s3Key = `${folderPath}/${folderType}/${file.originalname}`;

    let uploadedUrl;
    try {
      uploadedUrl = await uploadFileToS3(s3Key, file);
    } catch (err) {
      return res.status(500).json({ message: "Failed to upload image to S3" });
    }

    if (folderType === "logo") {
      company.logo = uploadedUrl;
    } else {
      if (!Array.isArray(company.images)) company.images = [];
      company.images.push({
        url: uploadedUrl,
        index: company.images.length + 1,
      });
    }

    await company.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: `Successfully uploaded ${pathCompanyType} company ${folderType}`,
      data: {
        companyId: company._id,
        businessId: company.businessId,
        type: folderType,
        url: uploadedUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addCompanyImagesBulk = async (req, res, next) => {
  try {
    const files = req.files;
    const { companyId, businessId, companyType = "" } = req.body;

    if (!files || !files.length) {
      return res.status(400).json({ message: "No files provided" });
    }

    let company;
    if (companyId) {
      company = await Company.findById(companyId).exec();
    } else if (businessId) {
      company = await Company.findOne({ businessId }).exec();
    } else {
      return res
        .status(400)
        .json({ message: "Provide companyId or businessId" });
    }

    if (!company) {
      return res.status(404).json({ message: "No such company found" });
    }

    if (
      companyType &&
      company.companyType?.toLowerCase() !== String(companyType).toLowerCase()
    ) {
      return res
        .status(400)
        .json({ message: "companyType does not match the stored company" });
    }

    const formatCompanyType = (type) => {
      const map = {
        hostel: "hostels",
        privatestay: "private-stay",
        meetingroom: "meetingroom",
        coworking: "coworking",
        cafe: "cafe",
        coliving: "coliving",
        workation: "workation",
      };
      const key = String(type || "").toLowerCase();
      return map[key] || "unknown";
    };

    const pathCompanyType = formatCompanyType(
      companyType || company.companyType
    );

    const safeCompanyName =
      (company.companyName || "unnamed").replace(/[^\w\- ]+/g, "").trim() ||
      "unnamed";

    const folderPath = `nomads/${pathCompanyType}/${company.country}/${safeCompanyName}`;
    const folderType = "images";

    if (!Array.isArray(company.images)) company.images = [];
    const startIndex = company.images.length;

    const sanitizeFileName = (name) =>
      String(name || "file")
        .replace(/[/\\?%*:|"<>]/g, "_")
        .replace(/\s+/g, "_");

    const results = await Promise.allSettled(
      files.map(async (file, i) => {
        const uniqueKey = `${folderPath}/${folderType}/${sanitizeFileName(
          file.originalname
        )}`;
        const uploadedUrl = await uploadFileToS3(uniqueKey, file);
        return {
          url: uploadedUrl,
          index: startIndex + i + 1,
          originalName: file.originalname,
          key: uniqueKey,
        };
      })
    );

    // Split successes and failures
    const successes = [];
    const failures = [];

    for (const r of results) {
      if (r.status === "fulfilled") successes.push(r.value);
      else failures.push({ reason: r.reason?.message || "Unknown error" });
    }

    // Append successful uploads to the company doc
    if (successes.length) {
      company.images.push(
        ...successes.map((s) => ({ url: s.url, index: s.index }))
      );
      // Skip validators to avoid tripping on unrelated fields
      await company.save({ validateBeforeSave: false });
    }

    return res.status(failures.length ? 207 : 200).json({
      message:
        failures.length && successes.length
          ? `Uploaded ${successes.length} images; ${failures.length} failed`
          : failures.length
          ? "All uploads failed"
          : `Successfully uploaded ${successes.length} images`,
      data: {
        companyId: company._id,
        businessId: company.businessId,
        type: folderType,
        uploaded: successes,
        failed: failures,
      },
    });
  } catch (error) {
    next(error);
  }
};
