import ShiftsSchemaModel from "../shifts/ShiftsSchema.js";
import ScheduleModel from "../schedule/ScheduleSchema.js";

export async function createSchedule() {
    const daysArray = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const allShifts = ShiftsSchemaModel.find({});
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
    for (const shift of allShifts) {
        for (const day of daysArray) {
            if (shift.shifts[day].includes(time)) {
                schedule.shifts[day][time].push(shift.name);
            }
        }
    }
    for (const day of daysArray){

    }

    return schedule;
}