import ShiftsSchemaModel from "../shifts/ShiftsSchema.js";
import ScheduleModel from "../schedule/ScheduleSchema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./environments/.env.dev" }); // or .env.prod

export async function createSchedule() {
    const daysArray = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const shiftsArray = ["morning", "middle", "evening", "night", "other"];
    const allShifts = await ShiftsSchemaModel.find({});
    const schedule = new ScheduleModel({
        date: new Date(),
        shifts: {
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

    });
    for (const worker of allShifts) {
        for (const day of daysArray) {
            for (const shift of shiftsArray) {
                if (worker.shifts[day].includes(shift) && schedule.shifts[day][shift] < 3) {
                    schedule.shifts[day][shift].push(worker.name);
                }
            }
        }
    }



    return schedule;
}
// ======== LOCAL RUNNER ========
console.log("environment: ", process.env.NODE_ENV);
console.log("DB_URI: ", process.env.DB_URI);
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(async () => {
            console.log("✅ Connected to MongoDB");

            const schedule = await createSchedule();
            console.log("🗓️ Generated Schedule:");
            console.dir(schedule.toObject(), { depth: null, colors: true });

            await mongoose.disconnect();
            console.log("✅ Disconnected");
        })
        .catch(err => {
            console.error("❌ Error:", err);
            mongoose.disconnect();
        });

