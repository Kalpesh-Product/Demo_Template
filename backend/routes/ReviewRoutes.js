import { Router } from "express";
import upload from "../config/multerConfig.js";
import { bulkInsertReviews } from "../controllers/reviewControllers.js";

const router = Router();
router.post("/bulk-insert-reviews", upload.single("reviews"), bulkInsertReviews);
export default router;
