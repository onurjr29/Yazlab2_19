const express = require('express');
const { applyForJob } = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadS3');

const router = express.Router();

// En fazla 5 dosya yüklenebilir
router.post('/', authMiddleware, upload.array('documents', 5), applyForJob);

module.exports = router;
