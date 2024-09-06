# Box
Storage Box like dropBox

Box/
│
├── backend/                 # Backend folder (Node.js)
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   └── routes/
│
└── frontend/                # Frontend folder (React)
    ├── src/
    ├── public/
    └── package.json


Backend:
dropbox-clone-backend/
│
├── config/
│   └── db.js          # MySQL database connection setup
├── controllers/
│   └── fileController.js  # File upload, listing, download logic
├── routes/
│   └── fileRoutes.js   # API routes
├── uploads/           # Store files locally (if not using S3)
├── .env               # Environment variables
├── server.js          # Main entry point
└── package.json

Backend Summary
Now you should have the following endpoints:

POST /api/files/upload: Upload a file.
GET /api/files: Get a list of all files.
GET /api/files/:filename: Download a file by its filename
