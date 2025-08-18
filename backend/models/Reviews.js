import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    name: {
      type: String,
    },
    starCount: {
      type: Number,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
    },
    reviewSource: {
      type: String,
    },
    reviewLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
