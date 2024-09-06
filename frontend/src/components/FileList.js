import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileList() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/files');
      setFiles(response.data);
    } catch (err) {
      setError('Failed to fetch files');
    }

  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="file-list">
      <h2>Uploaded Files</h2>
      {error && <p className="text-red-500">{error}</p>}
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a href={`http://localhost:5000/uploads/${file}`} target="_blank" rel="noopener noreferrer">
                {file.endsWith('.jpg') || file.endsWith('.png') ? (
                  <img src={`http://localhost:5000/uploads/${file}`} alt={file} className="w-[100px] h-[100px] object-contain m-4" />
                ) : (
                  file
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
