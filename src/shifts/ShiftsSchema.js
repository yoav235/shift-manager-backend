import mongoose from 'mongoose'

const shiftSchema = new mongoose.Schema({
    shiftId: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    shifts: {
        sunday: []
        , monday: []
        , tuesday: []
        , wednesday: []
        , thursday: []
        , friday: []
        , saturday: []
    },
    otherShiftHours: {
        sunday: undefined,
        monday: undefined,
        tuesday: undefined,
        wednesday: undefined,
        thursday: undefined,
        friday: undefined,
        saturday: undefined
    }
});

const ShiftsSchemaModel = mongoose.model('Shifts', shiftSchema, 'shifts');
export default ShiftsSchemaModel;