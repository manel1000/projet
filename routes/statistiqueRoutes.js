// routes/statisticsRoutes.js
const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistiqueController');
// Potentially add authentication/authorization middleware here if needed
// const { authenticate, authorize } = require('../middleware/authMiddleware');

// Example: GET /api/statistics/students-per-palier
router.get('/students-per-palier', statisticsController.getStudentsPerPalierStats);
// You might want to protect this route based on user roles from your schema:
// router.get('/students-per-palier', authenticate, authorize(['Admin', 'Chef_Département']), statisticsController.getStudentsPerPalierStats);


module.exports = router;

