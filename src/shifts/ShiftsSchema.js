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
    }
});

const shiftsSchemaModel = mongoose.model('Shifts', shiftSchema, 'shifts');
export default shiftsSchemaModel;