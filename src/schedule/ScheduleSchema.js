import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shiftsSchema = new Schema({
    sunday: [{type: String}],
    monday: [{type: String}],
    tuesday: [{type: String}],
    wednesday: [{type: String}],
    thursday: [{type: String}],
    friday: [{type: String}],
    saturday: [{type: String}]
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