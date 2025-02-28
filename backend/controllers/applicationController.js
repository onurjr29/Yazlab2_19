const sendEmail = require('../utils/emailService');
const Application = require('../models/Application');

exports.notifyApplicant = async (req, res) => {
    try {
        const application = await Application.findById(req.params.applicationId).populate('applicantId');

        if (!application) return res.status(404).json({ error: 'Başvuru bulunamadı' });

        const message = `Sayın ${application.applicantId.email}, başvurunuz ${application.status} olarak güncellenmiştir.`;
        await sendEmail(application.applicantId.email, 'Başvuru Sonucu', message);

        res.status(200).json({ message: 'E-posta gönderildi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.applyForJob = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'En az bir belge yüklenmelidir.' });
        }

        // AWS S3'ye yüklenen dosyaların URL'lerini al
        const documentURLs = req.files.map(file => file.location);

        // MongoDB'ye başvuruyu kaydet
        const application = await Application.create({
            jobId: req.body.jobId,
            applicantId: req.user.id,
            documents: documentURLs,
        });

        res.status(201).json({ message: 'Başvuru yapıldı', application });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getApplicationDocuments = async (req, res) => {
    try {
        const application = await Application.findById(req.params.applicationId);
        if (!application) return res.status(404).json({ error: 'Başvuru bulunamadı' });

        res.status(200).json({ documents: application.documents });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteApplicationDocument = async (req, res) => {
    try {
        const application = await Application.findById(req.params.applicationId);
        if (!application) return res.status(404).json({ error: 'Başvuru bulunamadı' });

        const fileURL = req.body.fileURL;
        if (!application.documents.includes(fileURL)) return res.status(400).json({ error: 'Belge başvuruya ait değil.' });

        // AWS S3'dan dosyayı sil
        const fileKey = fileURL.split('/').pop();
        await s3.deleteObject({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileKey
        }).promise();

        // MongoDB'den belgeyi kaldır
        application.documents = application.documents.filter(doc => doc !== fileURL);
        await application.save();

        res.status(200).json({ message: 'Belge silindi.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
