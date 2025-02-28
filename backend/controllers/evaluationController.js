const Evaluation = require('../models/Evaluation');
const Application = require('../models/Application');

exports.evaluateApplication = async (req, res) => {
    try {
        if (req.user.role !== 'Jüri') return res.status(403).json({ error: 'Yetkisiz işlem' });

        const { applicationId, score, comments, status } = req.body;
        const evaluation = await Evaluation.create({
            applicationId,
            juryId: req.user.id,
            score,
            comments,
            status,
        });

        res.status(201).json({ message: 'Değerlendirme kaydedildi', evaluation });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEvaluationsForApplication = async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ applicationId: req.params.applicationId }).populate('juryId', 'email');
        res.status(200).json(evaluations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEvaluation = async (req, res) => {
    try {
        if (req.user.role !== 'Jüri') return res.status(403).json({ error: 'Yetkisiz işlem' });

        const evaluation = await Evaluation.findOneAndUpdate(
            { applicationId: req.params.applicationId, juryId: req.user.id },
            { score: req.body.score, comments: req.body.comments, status: req.body.status },
            { new: true }
        );

        res.status(200).json({ message: 'Değerlendirme güncellendi', evaluation });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.calculateFinalScore = async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ applicationId: req.params.applicationId });

        if (evaluations.length === 0) {
            return res.status(404).json({ error: 'Bu başvuru için değerlendirme bulunamadı.' });
        }

        const totalScore = evaluations.reduce((acc, eval) => acc + eval.score, 0);
        const averageScore = totalScore / evaluations.length;

        // Yeni sistemde otomatik onay yok, sadece jüri ortalama puanı hesaplanır.
        res.status(200).json({ applicationId: req.params.applicationId, averageScore, message: "Ortalama jüri puanı hesaplandı, nihai karar jüri başkanı veya yönetici tarafından verilecektir." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.finalizeApplication = async (req, res) => {
    try {
        if (req.user.role !== 'Yönetici' && req.user.role !== 'Jüri Başkanı') {
            return res.status(403).json({ error: 'Sadece jüri başkanı veya yönetici başvuruyu onaylayabilir.' });
        }

        const application = await Application.findById(req.params.applicationId);
        if (!application) return res.status(404).json({ error: 'Başvuru bulunamadı' });

        application.status = req.body.status; // 'Onaylandı' veya 'Reddedildi'
        await application.save();

        res.status(200).json({ message: `Başvuru ${application.status} olarak güncellendi.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
