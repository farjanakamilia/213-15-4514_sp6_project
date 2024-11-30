const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',  // Use your database host
    user: 'root',       // Replace with your MySQL username
    password: '',       // Replace with your MySQL password
    database: 'diu_transport'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API to handle form submissions
app.post('/book', (req, res) => {
    const { name, email, phone_number, destination, date } = req.body;

    const sql = `INSERT INTO bookings (name, email, phone_number, destination, date) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [name, email, phone_number, destination, date], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data.');
        } else {
            res.status(200).send('Booking saved successfully!');
        }
    });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});