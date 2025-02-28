const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    juryId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    comments: { type: String },
    status: { type: String, enum: ['Onaylandı', 'Reddedildi', 'Beklemede'], default: 'Beklemede' },
}, { timestamps: true });

const Evaluation = mongoose.model('Evaluation', EvaluationSchema);
module.exports = Evaluation;
