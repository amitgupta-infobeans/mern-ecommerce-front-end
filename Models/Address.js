import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  fullName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: Number, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const AddressModel = mongoose.model("Address", AddressSchema);
