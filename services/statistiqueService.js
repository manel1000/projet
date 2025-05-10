// services/statistiqueService.js
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

async function getStudentCountPerSection() {
    const sql = `
        SELECT
            SEC.id_section,
            SEC.code_section,
            SP.id_specialite,
            SP.nom_specialite,
            P.id_palier,
            P.nom_palier,
            COUNT(S.matricule) AS nombre_etudiants
        FROM
            Section SEC
        LEFT JOIN
            Students S ON S.section_id = SEC.id_section
        JOIN
            Specialite SP ON SEC.id_specialite = SP.id_specialite
        JOIN
            Palier P ON SP.id_palier = P.id_palier
        GROUP BY
            SEC.id_section, SEC.code_section, SP.id_specialite, SP.nom_specialite, P.id_palier, P.nom_palier
        ORDER BY
            P.nom_palier, SP.nom_specialite, SEC.code_section;
    `;

    try {
        const [rows] = await dbPool.query(sql);
        return rows;
    } catch (error) {
        console.error("Error fetching student count per section:", error);
        throw error; // Re-throw the error to be handled by the controller
    }
}

async function getHandicapedStudentCount() {
    const [rows] = await pool.query(`
      SELECT 
        COUNT(*) AS total_students,
        SUM(CASE WHEN situation_physique = 'HANDICAPE' THEN 1 ELSE 0 END) AS handicap_count,
        (SUM(CASE WHEN situation_physique = 'HANDICAPE' THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS percentage
      FROM Students
    `);
    
    return rows[0];
  }


module.exports = {
    getStudentCountPerPalier,
    getStudentCountPerSection,
   getHandicapedStudentCount};
    
