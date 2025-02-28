const mongoose = require('mongoose');

const JobListingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Doktor Öğretim Üyesi', 'Doçent', 'Profesör'], required: true },
    requirements: [{ type: String }], // Başvuru kriterleri
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin ID'si
}, { timestamps: true });

const JobListing = mongoose.model('JobListing', JobListingSchema);
module.exports = JobListing;
