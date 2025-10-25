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
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0
    }
});

const ShiftsSchemaModel = mongoose.model('Shifts', shiftSchema, 'shifts');
export default ShiftsSchemaModel;