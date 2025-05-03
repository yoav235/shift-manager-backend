import express from 'express';
import ShiftSchemaModel from "./ShiftsSchema.js";
import { errorResponseObject, successResponseObject } from "../utils/responseObjects.js";
import shiftsSchemaModel from "./ShiftsSchema.js";

const shiftRouter = express.Router();

shiftRouter.get('/hello', (req, res) => {
    res.send('Hello, World!!!!');
});

shiftRouter.post('/getShifts', async (req, res) => {
    const shifts = req.body;
    console.log("get shifts for ", shifts.email);
    try {
        const shiftsDB = await ShiftSchemaModel.find({ email: shifts.email });
        console.log("All shifts: ", shiftsDB);
        res.status(200).json(successResponseObject("All shifts", shiftsDB));
    } catch (err) {
        res.status(400).json(errorResponseObject("Failed to get shifts", err.message));
    }
});

shiftRouter.post('/addShift', async (req, res) => {
    try {
        const shiftData = req.body;
        shiftsSchemaModel.findOneAndReplace({email: shiftData.userId}, shiftData, {upsert: true})
        const newShift = new ShiftSchemaModel(shiftData);
        const result = await newShift.save();
        if (result) {
            res.status(201).json(successResponseObject("Shift created successfully", result));
        } else {
            res.status(400).json(errorResponseObject("Failed to create shift"));
        }
    } catch (err) {
        res.status(400).json(errorResponseObject("Failed to create shift", err.message));
    }
});

shiftRouter.delete('/deleteShift', async (req, res) => {
    try {
        const shiftId = req.body.email;
        const result = await ShiftSchemaModel.findOneAndDelete(shiftId);
        if (result) {
            res.status(200).json(successResponseObject("Shift deleted successfully", result));
        } else {
            res.status(400).json(errorResponseObject("Failed to delete shift"));
        }
    } catch (err) {
        res.status(400).json(errorResponseObject("Failed to delete shift", err.message));
    }
});


export default shiftRouter;
