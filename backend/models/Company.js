import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  businessId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  registeredEntityName: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  images: {
    type: [{ url: String, index: Number }],
  },
  address: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  googleMap: {
    type: String,
    trim: true,
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  totalSeats: {
    type: Number,
  },
  inclusions: {
    type: String,
  },
  units: {
    type: String,
  },
  services: {
    type: String,
  },
  companyType: {
    type: String,
    enum: [
      "coworking",
      "coliving",
      "workation",
      "meetingroom",
      "privatestay",
      "hostel",
      "cafe"
    ],
    required: true,
  },
});

companySchema.index({ companyType: 1 });

const Company = mongoose.model("Company", companySchema);
export default Company;
