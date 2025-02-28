const express = require('express');
const upload = require('../middleware/uploadS3');
const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Dosya yüklenmedi' });
        }

        // Dosyanın AWS S3 URL'sini döndür
        res.status(200).json({ message: 'Dosya başarıyla yüklendi', fileUrl: req.file.location });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
