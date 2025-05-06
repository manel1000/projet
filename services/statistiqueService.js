// services/palierService.js
const dbPool = require('../database/db');

async function getStudentCountPerPalier() {
    const sql = `
        SELECT
            P.id_palier,
            P.nom_palier,
            P.code_palier,
            COUNT(S.matricule) AS nombre_etudiants
        FROM
            Palier P
        LEFT JOIN
            Students S ON S.palier_id = P.id_palier
        GROUP BY
            P.id_palier, P.nom_palier, P.code_palier
        ORDER BY
            P.id_palier;
    `;

    try {
        const [rows] = await dbPool.query(sql);
        return rows;
    } catch (error) {
        console.error("Error fetching student count per palier:", error);
        throw error; // Re-throw the error to be handled by the controller
    }
}

module.exports = {
    getStudentCountPerPalier
};