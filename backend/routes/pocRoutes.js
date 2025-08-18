import { Router } from "express";
import upload from "../config/multerConfig.js";
import { bulkInsertPoc } from "../controllers/pocControllers.js";

const router = Router();
router.post("/bulk-insert-poc", upload.single("poc"), bulkInsertPoc);
export default router;
