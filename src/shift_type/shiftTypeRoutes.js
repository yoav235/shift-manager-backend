import express from "express";
import ShiftTypeSchemaModel from "./shiftTypeSchema.js";
import {errorResponseObject, successResponseObject} from "../utils/responseObjects.js";

const shiftTypeRouter = express.Router();


shiftTypeRouter.get('/getShiftTypes', async (req, res) => {
    try {
        console.log("Get all shift types");
        const shiftTypes = await ShiftTypeSchemaModel.find({}).lean();
        res.json(successResponseObject("got all shift types", shiftTypes));
    } catch (error) {
        console.error("Error fetching shift types:", error);
        res.status(500).json(errorResponseObject("Error fetching shift types"));
    }
});

shiftTypeRouter.post('/updateShiftType', async (req, res) => {
    try {
        const shiftTypeData = req.body;
        const updatedShiftType = await ShiftTypeSchemaModel.findByIdAndUpdate(shiftTypeData._id, { $set: shiftTypeData }, { new: true });
        res.json(successResponseObject("Shift type updated successfully", updatedShiftType));
    } catch (error) {
        console.error("Error updating shift type:", error);
        res.status(500).json(errorResponseObject("Error updating shift type"));
    }
});

export default shiftTypeRouter;



