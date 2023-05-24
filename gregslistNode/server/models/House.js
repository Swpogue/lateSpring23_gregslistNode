import mongoose from "mongoose";
const Schema = mongoose.Schema

export const HouseSchema = new Schema(
  {
    bedrooms: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    squareFoot: { type: Number, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true, maxLength: 500 },
    creatorId: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true }
)