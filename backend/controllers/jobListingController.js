const JobListing = require('../models/JobListing');

exports.createJobListing = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') return res.status(403).json({ error: 'Yetkisiz işlem' });

        const job = await JobListing.create({ ...req.body, createdBy: req.user.id });
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getJobListings = async (req, res) => {
    try {
        const jobs = await JobListing.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateJobListing = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') return res.status(403).json({ error: 'Yetkisiz işlem' });

        const job = await JobListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteJobListing = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') return res.status(403).json({ error: 'Yetkisiz işlem' });

        await JobListing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'İlan silindi' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
