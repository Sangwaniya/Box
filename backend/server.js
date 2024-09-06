const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db'); // Import the database config
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Test MySQL connection using async/await
(async () => {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('Database connected successfully:', rows);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// List all files API
app.get('/api/files', async (req, res) => {
  try {
    const [files] = await db.query('SELECT * FROM files');
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Download file API
app.get('/api/files/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', fileName);

  res.download(filePath, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to download file' });
    }
  });
});