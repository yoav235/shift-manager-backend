import mongoose from "mongoose";

const shiftTypeSchema = new mongoose.Schema({
    shift_type: [String]
});

const ShiftTypeSchemaModel = mongoose.model('ShiftType', shiftTypeSchema, 'shift_type');
export default ShiftTypeSchemaModel;