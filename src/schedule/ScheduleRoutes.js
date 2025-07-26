import express from 'express';
import ScheduleModel from "./ScheduleSchema.js";
import { errorResponseObject, successResponseObject } from "../utils/responseObjects.js";


const scheduleRouter = express.Router();

scheduleRouter.get('/hello', (req, res) => {
    res.send('Hello, World!!!!');
});


scheduleRouter.get('/getCurrentSchedules', async (req, res) => {
    try {
        const latestSchedule = await ScheduleModel.findOne().sort({ date: -1 });
        if (!latestSchedule) {
            return res.status(404).json(errorResponseObject("Error finding latest schedule"));
        }
        res.status(200).json(successResponseObject("All schedules retrieved successfully", latestSchedule));
    } catch (error) {
        res.status(500).json(errorResponseObject("Failed to retrieve schedules", error.message));
    }
});

scheduleRouter.post('/addSchedule', async (req, res) => {
    try {
        const scheduleData = req.body;
        const newSchedule = new ScheduleModel(scheduleData);
        const result = await newSchedule.save();
        if (result) {
            res.status(201).json(successResponseObject("Schedule created successfully", result));
        } else {
            res.status(400).json(errorResponseObject("Failed to create schedule"));
        }
    } catch (err) {
        res.status(400).json(errorResponseObject("Failed to create schedule", err.message));
    }
});