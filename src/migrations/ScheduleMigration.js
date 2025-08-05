import ScheduleModel from "../schedule/ScheduleSchema.js";

// mockSchedule.js
const mockSchedule = {
    date: new Date("2025-08-10T00:00:00.000Z"),   // change to the week you want
    shifts: {
        sunday: {
            morning: ["Alice", "Bob"],
            middle:  ["Charlie", "Diana"],
            evening: ["Eve", "Frank"],
            night:   ["Grace"]
        },
        monday: {
            morning: ["Hannah", "Ian"],
            middle:  ["Jack", "Kara"],
            evening: ["Liam", "Mia"],
            night:   ["Noah"]
        },
        tuesday: {
            morning: ["Olivia", "Paul"],
            middle:  ["Quinn", "Riley"],
            evening: ["Sam", "Tara"],
            night:   ["Uma"]
        },
        wednesday: {
            morning: ["Victor", "Wendy"],
            middle:  ["Xander", "Yara"],
            evening: ["Zane", "Ariel"],
            night:   ["Ben"]
        },
        thursday: {
            morning: ["Cara", "Derek"],
            middle:  ["Elena", "Felix"],
            evening: ["Gavin", "Hailey"],
            night:   ["Ivan"]
        },
        friday: {
            morning: ["Jade", "Kyle"],
            middle:  ["Laura", "Matt"],
            evening: ["Nina", "Owen"],
            night:   ["Piper"]
        },
        saturday: {
            morning: ["Quincy", "Rose"],
            middle:  ["Sean", "Tia"],
            evening: ["Uri", "Val"],
            night:   ["Will"]
        }
    }
};


export default async function migrate() {
    try {
        console.log("Starting mock schedule migration...");
        // Create a new schedule document
        const newSchedule = new ScheduleModel(mockSchedule);
        console.log("Creating new schedule:", newSchedule);

        // Save the new schedule to the database
        await newSchedule.save();

        console.log("Mock schedule migration completed successfully.");
    } catch (error) {
        console.error("Error during mock schedule migration:", error);
    }
}