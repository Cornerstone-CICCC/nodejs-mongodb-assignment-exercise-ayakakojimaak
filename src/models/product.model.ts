import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  productPrice: number;
}

const productSchema: Schema = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
});
export const Product = mongoose.model<IProduct>("Product", productSchema);
