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
        sunday: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null
    }
});

const ShiftsSchemaModel = mongoose.model('Shifts', shiftSchema, 'shifts');
export default ShiftsSchemaModel;