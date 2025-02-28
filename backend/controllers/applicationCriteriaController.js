const ApplicationCriteria = require('../models/ApplicationCriteria');

exports.createCriteria = async (req, res) => {
    try {
        if (req.user.role !== 'Yönetici') return res.status(403).json({ error: 'Yetkisiz işlem' });

        const criteria = await ApplicationCriteria.create(req.body);
        res.status(201).json(criteria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCriteriaByJob = async (req, res) => {
    try {
        const criteria = await ApplicationCriteria.find({ jobId: req.params.jobId });
        res.status(200).json(criteria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.applyForJob = async (req, res) => {
    try {
        const application = await Application.create({
            jobId: req.body.jobId,
            applicantId: req.user.id,
            documents: req.body.documents,
        });
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getApplicationsByUser = async (req, res) => {
    try {
        const applications = await Application.find({ applicantId: req.user.id }).populate('jobId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
