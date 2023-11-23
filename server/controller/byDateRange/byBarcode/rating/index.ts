import express from "express";
import getRatingByNmidList from "./getRatingByNmidList";
import SupplierReportDetailByPeriod from "../../../../model/supplierReportDetailByPeriod";
import getRatingFromWB, { Rating } from "../../../../utils/fromWB/getRatingFromWB";
import SupplierRating from "../../../../model/supplierRating";

const ratingByNmid = express.Router();

ratingByNmid.get("/", async (req, res, next) => {
    const nmidAsString = req.query["nmid"] as string;
    try {
        if (!(nmidAsString)) throw new Error("Wrong nmid");
        const nmidList = nmidAsString.split(",");
        const ratingListFromDB: Rating[] = await SupplierRating.aggregate(getRatingByNmidList(nmidList)).exec();
        const filteredRatingListFromDB = ratingListFromDB.filter(rating => rating);
        const missingItems = nmidList.filter(el => !filteredRatingListFromDB.find(rating => +rating.nmId === +el));
        const list = (await Promise.all([...missingItems.map(el => getRatingFromWB(el))])).filter(el => el);
        await SupplierRating.insertMany(list.filter(el => el && !el.error));
        const ratingMap: Record<string, Rating> = {};
        [...ratingListFromDB, ...list].forEach(rating => { if (rating?.nmId && !rating?.error) ratingMap[rating.nmId] = rating });
        res.set('Cache-control', 'public, max-age=3000');
        res.status(200).json(ratingMap);
    } catch (e: any) {
        res.status(400).json(e.message);
    }
});

export default ratingByNmid;
