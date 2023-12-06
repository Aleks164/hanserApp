import mongoose from "mongoose";

const supplierFeedbacksSchema = new mongoose.Schema({

},
    {
        strict: false
    });

const SupplierFeedbacks = mongoose.model("SupplierFeedbacks", supplierFeedbacksSchema);

export default SupplierFeedbacks;
