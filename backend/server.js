const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const db = require('./config/db'); // Import the database config
const path = require('path');
const cors = require('cors'); // Import CORS middleware
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload());
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

/// List files API
app.get('/api/files', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');

  // Read the directory and return the file names
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }

    // Send the list of file names to the frontend
    res.json(files);
  });
});

// File Upload API
app.post('/api/files/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let uploadedFile = req.files.file;

  const uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);

  // Use mv() to place file on the server
  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send({ message: 'File uploaded!', fileName: uploadedFile.name });
  });
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