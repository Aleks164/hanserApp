import express from "express";
import SupplierSales from "../model/supplierSales";
import getSupplierSalesFromWB from "../utils/fromWB/getSupplierSalesFromWB";

const updateSupplierSales = express.Router();

updateSupplierSales.get("/", async (req, res, next) => {

    const salesListFromWB = await getSupplierSalesFromWB();
    try {
        const sale = await SupplierSales.create(salesListFromWB);
        res.status(200).json(sale);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default updateSupplierSales;
