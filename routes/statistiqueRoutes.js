// routes/statisticsRoutes.js
const express = require ('express');
const router = express.Router();
const stats= require('../controllers/statistiqueController');


// Example: GET /api/statistics/students-per-palier
router.get('/students-per-palier', stats.getStudentsPerPalierStats);
// You might want to protect this route based on user roles from your schema:
 

// NEW ROUTE: For students per section
// Example: GET /api/statistics/students-per-section 
router.get('/students-per-section', stats.getStudentsPerSectionStats);


//NEW ROUTE : FOR SITUATION 

router.get('/handicape', stats.handleGetHandicapedCount);


module.exports = router;

