const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobListing', required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documents: [{ type: String }], // AWS S3'deki dosya URL'leri
    status: { type: String, enum: ['Beklemede', 'Onaylandı', 'Reddedildi'], default: 'Beklemede' },
}, { timestamps: true });

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;
