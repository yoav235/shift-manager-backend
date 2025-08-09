import ShiftsSchemaModel from "../shifts/ShiftsSchema.js";
import ScheduleModel from "../schedule/ScheduleSchema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: `../../environment/.env.prod` });
console.log("cwd:", process.cwd());

export async function createSchedule() {
    console.log("Starting createSchedule function...");

    const daysArray = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const shiftsArray = ["morning", "middle", "evening", "night"];

    const allShifts = await ShiftsSchemaModel.find({}).lean();
    console.log("allShifts: ", allShifts);
    const schedule = new ScheduleModel({
        date: new Date(),
        shifts: {
            sunday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            monday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            tuesday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            wednesday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            thursday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            friday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            saturday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            }
        }
    });
    for (const worker of allShifts) {
        for (const day of daysArray) {
            for (const shift of shiftsArray) {
                if (worker.shifts[day].includes(shift) && schedule.shifts[day][shift].length < 3) {
                    schedule.shifts[day][shift].push(worker.name);
                }
            }
        }
    }



    return schedule;
}
console.log("environment variables loaded:", process.env.DB_URI);
mongoose.connect(
    process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log("Connected to MongoDB");
        try {
            const schedule = await createSchedule();
            console.log("Generated Schedule:", schedule["shifts"]);
        } catch (error) {
            console.error("Error creating schedule:", error);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    });

//todo - the same workers are in 2 or more shifts at the same day. fix it!