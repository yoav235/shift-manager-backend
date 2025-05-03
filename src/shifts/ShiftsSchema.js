import mongoose from 'mongoose'

const shiftSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
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