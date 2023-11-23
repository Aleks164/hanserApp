import mongoose from "mongoose";

const supplierRatingSchema = new mongoose.Schema({
    "valuation": String,
    "feedbacksCount": Number,
    "nmId": Number
});

const SupplierRating = mongoose.model("SupplierRating", supplierRatingSchema);

export default SupplierRating;
