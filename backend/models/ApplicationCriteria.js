const mongoose = require('mongoose');

const ApplicationCriteriaSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobListing', required: true },
    requiredDocuments: [{ type: String }], // Gerekli belgeler
    minPublications: { type: Number, required: true },
    minCitations: { type: Number, required: true },
}, { timestamps: true });

const ApplicationCriteria = mongoose.model('ApplicationCriteria', ApplicationCriteriaSchema);
module.exports = ApplicationCriteria;
