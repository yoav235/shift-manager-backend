import mongoose from "mongoose";

const Schema = mongoose.Schema;

const daySchema = new Schema({
    morning: [{ type: String }],
    middle: [{ type: String }],
    evening: [{ type: String }],
    night: [{ type: String }]
})

const shiftsSchema = new Schema({
    sunday: {type: daySchema},
    monday: {type: daySchema},
    tuesday: {type: daySchema},
    wednesday: {type: daySchema},
    thursday: {type: daySchema},
    friday: {type: daySchema},
    saturday: {type: daySchema}
})

const scheduleSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    shifts: {
        type: shiftsSchema,
        required: true
    }
});

const ScheduleModel = mongoose.model('Schedule', scheduleSchema, 'schedules');
export default ScheduleModel;