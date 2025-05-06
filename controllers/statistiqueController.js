// controllers/statisticsController.js
const palierService = require('../services/statistiqueService');

async function getStudentsPerPalierStats(req, res) {
    try {
        const stats = await palierService.getStudentCountPerPalier();
        res.status(200).json({
            success: true,
            message: 'Student counts per palier fetched successfully.',
            data: stats
        });
    } catch (error) {
        console.error("Error in statisticsController > getStudentsPerPalierStats:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch student statistics per palier.',
            error: error.message // Provide a general error message in production
        });
    }
}

module.exports = {
    getStudentsPerPalierStats
};