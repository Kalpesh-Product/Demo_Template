import { Router } from "express";
import upload from "../config/multerConfig.js";
import {
  bulkInsertCompanies,
  getCompaniesData,
  getCompanyData,
} from "../controllers/compayControllers.js";

const router = Router();
router.post(
  "/bulk-insert-companies",
  upload.single("companies"),
  bulkInsertCompanies
);

router.get("/companies", getCompaniesData);
router.get("/get-single-company-data/:companyId", getCompanyData);

export default router;
