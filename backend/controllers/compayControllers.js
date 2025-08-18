import Company from "../models/Company.js";
import Review from "../models/Reviews.js";
import PointOfContact from "../models/PointOfContact.js";
import { Readable } from "stream";
import csvParser from "csv-parser";

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
          company.companyType === type &&
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
    const companyId = req.params;
    const companyData = await Company.findOne({ _id: companyId }).lean().exec();
    const reviews = await Review.find({ company: companyId }).lean().exec();
    const poc = await PointOfContact.findOne({
      company: companyId,
      isActive: true,
    })
      .lean()
      .exec();
    return res.status(200).json({
      success: true,
      ...companyData,
      reviews,
      ...poc,
    });
  } catch (error) {
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
