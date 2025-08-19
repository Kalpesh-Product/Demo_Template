import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { corsConfig } from "./config/corsConfig.js";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import companyRoutes from "./routes/companyRoutes.js";
import pocRoutes from "./routes/pocRoutes.js";
import reviewRoutes from "./routes/ReviewRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import connectDb from "./config/db.js";

const app = express();
config({ override: true });
connectDb(process.env.MONGO_URL);

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use("/api/company", companyRoutes);
app.use("/api/poc", pocRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/job", jobRoutes);

app.all("/*splat", (req, res) => {
  if (req.accepts("html")) {
    res.status(404).send("<h1>404 not found</h1>");
  } else if (req.accepts("json")) {
    return res.status(404).json({ message: "404 not found" });
  } else {
    res.type("text").status(404).send("404 not found");
  }
});
app.use(errorHandler);
app.listen(
  PORT,
  mongoose.connection.once("open", () => {
    console.log(`Server is running on port ${PORT}`);
  })
);
