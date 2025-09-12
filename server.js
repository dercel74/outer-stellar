const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Database setup (Database component)
const db = new sqlite3.Database('./stellar_data.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    // Projects table for software development tracking
    db.run(`CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Stellar objects table for astronomy data
    db.run(`CREATE TABLE IF NOT EXISTS stellar_objects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT,
        constellation TEXT,
        magnitude REAL,
        coordinates TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Creative ideas table
    db.run(`CREATE TABLE IF NOT EXISTS creative_ideas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        inspiration TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

// API Routes

// Software Development endpoints
app.get('/api/projects', (req, res) => {
    db.all("SELECT * FROM projects ORDER BY created_at DESC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.post('/api/projects', (req, res) => {
    const { name, description } = req.body;
    db.run("INSERT INTO projects (name, description) VALUES (?, ?)", [name, description], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, name, description });
        }
    });
});

// Database/Astronomy endpoints
app.get('/api/stellar-objects', (req, res) => {
    db.all("SELECT * FROM stellar_objects ORDER BY magnitude ASC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.post('/api/stellar-objects', (req, res) => {
    const { name, type, constellation, magnitude, coordinates, notes } = req.body;
    db.run("INSERT INTO stellar_objects (name, type, constellation, magnitude, coordinates, notes) VALUES (?, ?, ?, ?, ?, ?)", 
           [name, type, constellation, magnitude, coordinates, notes], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, name, type, constellation, magnitude, coordinates, notes });
        }
    });
});

// Creativity endpoints
app.get('/api/creative-ideas', (req, res) => {
    db.all("SELECT * FROM creative_ideas ORDER BY created_at DESC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.post('/api/creative-ideas', (req, res) => {
    const { title, description, category, inspiration } = req.body;
    db.run("INSERT INTO creative_ideas (title, description, category, inspiration) VALUES (?, ?, ?, ?)", 
           [title, description, category, inspiration], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, title, description, category, inspiration });
        }
    });
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Outer Stellar server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});