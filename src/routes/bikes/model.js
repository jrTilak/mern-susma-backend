import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    companyName: { type: String, required: true },

    // full description
    details: { type: String },

    image: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Bike = mongoose.model("Bike", bikeSchema);
