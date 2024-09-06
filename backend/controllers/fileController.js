const multer = require('multer');
const path = require('path');
const db = require('../config/db');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit to 1MB
  fileFilter: (req, file, cb) => {
    const filetypes = /txt|jpg|png|json/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only .txt, .jpg, .png, .json formats allowed!'));
    }
  },
}).single('file');

// Upload File API
exports.uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { originalname, filename, mimetype, size } = req.file;
    
    try {
      const [result] = await db.query(
        "INSERT INTO files (filename, original_name, file_type, file_size) VALUES (?, ?, ?, ?)",
        [filename, originalname, mimetype, size]
      );
      res.status(201).json({ message: 'File uploaded successfully', fileId: result.insertId });
    } catch (error) {
      res.status(500).json({ message: 'Database error', error });
    }
  });
};
