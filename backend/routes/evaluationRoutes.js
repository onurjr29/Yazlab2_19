const express = require('express');
const { evaluateApplication, getEvaluationsForApplication, updateEvaluation } = require('../controllers/evaluationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, evaluateApplication);
router.get('/:applicationId', authMiddleware, getEvaluationsForApplication);
router.put('/:applicationId', authMiddleware, updateEvaluation);
router.get('/final-score/:applicationId', authMiddleware, calculateFinalScore);
router.put('/finalize/:applicationId', authMiddleware, finalizeApplication);

module.exports = router;

