const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

function isValidDate(dateStr) {
    // strict YYYY-MM-DD check
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

// Daily summary
router.get('/daily-summary', authenticateToken, async (req, res) => {
    try {
        const { date } = req.query;

        // Date validation
        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'Date query parameter is required (YYYY-MM-DD)'
            });
        }

        if (!isValidDate(date)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format. Use YYYY-MM-DD'
            });
        }

        // Only managers allowed
        if (req.user.role !== 'manager') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Managers only'
            });
        }

        // Fetch check-ins for the given date
        const [rows] = await pool.execute(
            `
            SELECT 
                ch.employee_id,
                u.name AS employee_name,
                ch.checkin_time,
                ch.checkout_time,
                ch.distance_from_client
            FROM checkins ch
            JOIN users u ON ch.employee_id = u.id
            WHERE DATE(ch.checkin_time) = ?
            `,
            [date]
        );

        let totalHoursWorked = 0;
        const uniqueEmployees = new Set();

        const details = rows.map(row => {
            let hoursWorked = 0;

            if (row.checkout_time) {
                const checkinTime = new Date(row.checkin_time);
                const checkoutTime = new Date(row.checkout_time);
                hoursWorked =
                    (checkoutTime - checkinTime) / (1000 * 60 * 60);
                totalHoursWorked += hoursWorked;
            }

            uniqueEmployees.add(row.employee_id);

            return {
                employee_id: row.employee_id,
                employee_name: row.employee_name,
                hours_worked: Number(hoursWorked.toFixed(2)),
                distance_km: row.distance_from_client
            };
        });

        res.json({
            success: true,
            date,
            summary: {
                total_checkins: rows.length,
                total_employees: uniqueEmployees.size,
                total_hours_worked: Number(totalHoursWorked.toFixed(2))
            },
            details
        });

    } catch (error) {
        console.error('Daily summary error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate daily summary'
        });
    }
});

module.exports = router;
