import Review from "../models/Reviews.js";
import { Readable } from "stream";
import csvParser from "csv-parser";
import Company from "../models/Company.js";

export const bulkInsertReviews = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ message: "Please provide a valid CSV file" });
    }

    const companies = await Company.find().lean();
    const companyMap = new Map(
      companies.map((item) => [item.businessId?.trim(), item._id])
    );

    const reviews = [];
    const missingCompanyRows = [];
    const stream = Readable.from(file.buffer.toString("utf-8").trim());
    stream
      .pipe(csvParser())
      .on("data", (row) => {
        const businessId = row["Business ID"]?.trim();
        const companyId = companyMap.get(businessId);

        if (!companyId) {
          missingCompanyRows.push({
            row,
            reason: "Invalid Business ID",
            businessId,
          });
        }

        const formattedReviews = {
          company: companyId,
          name: row["Reviewer Name"]?.trim(),
          starCount: parseInt(row["Rating"]?.trim()),
          description: row["Review Text"]?.trim(),
          reviewSource: row["Platform"]?.trim(),
          reviewLink: row["Review Link"]?.trim(),
        };
        reviews.push(formattedReviews);
      })
      .on("end", async () => {
        try {
          const result = await Review.insertMany(reviews);
          const insertedCount = result.length;
          const failedCount = reviews.length - insertedCount;
          res.status(200).json({
            message: "Bulk insert completed with partial success",
            total: reviews.length,
            inserted: insertedCount,
            failed: failedCount,
          });
        } catch (insertError) {
          if (insertError.name === "BulkWriteError") {
            const insertedCount = insertError.result?.nInserted || 0;
            const failedCount = reviews.length - insertedCount;

            res.status(200).json({
              message: "Bulk insert completed with partial failure",
              total: reviews.length,
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
