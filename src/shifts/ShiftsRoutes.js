import express from 'express';
import ShiftSchemaModel from "./ShiftsSchema.js";
import { errorResponseObject, successResponseObject } from "../utils/responseObjects.js";
import ShiftsSchemaModel from "./ShiftsSchema.js";

const shiftRouter = express.Router();

shiftRouter.get('/hello', (req, res) => {
    res.send('Hello, World!!!!');
});


shiftRouter.get('getAllShifts', (req, res) => {
    try {
        const shifts = ShiftSchemaModel.find({})
        if (!shifts) {
            res.status(404).send('No shifts found');
        }
        res.status(200).json(successResponseObject("got all shifts", shifts));
    }
    catch (error) {
        res.status(400).send(errorResponseObject("failed to get all shifts because: ", error.message));
    }
})

shiftRouter.post('/getShifts', async (req, res) => {
    const shifts = req.body;
    console.log("get shifts for ", shifts._id);
    try {
        const shiftsDB = await ShiftSchemaModel.find({ shiftId: shifts._id });
        console.log("All shifts: ", shiftsDB);
        res.status(200).json(successResponseObject("All shifts", shiftsDB));
    } catch (err) {
        res.status(400).json(errorResponseObject("Failed to get shifts", err.message));
    }
});

shiftRouter.post('/addShift', async (req, res) => {
    try {
        const shiftData = req.body;
        ShiftsSchemaModel.findOneAndReplace({email: shiftData.userId}, shiftData, {upsert: true})
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
