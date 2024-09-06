import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FileList() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/files');
        setFiles(response.data);  // Update state with fetched files
      } catch (err) {
        setError('Failed to fetch files');
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Uploaded Files</h2>
      {error && <p className="text-red-500">{error}</p>}
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {files.map((file, index) => (
            <li key={index} className="mb-2">
              <a
                href={`http://localhost:5000/uploads/${file}`}
                className="text-blue-500 hover:underline"
                download
              >
                {file}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileList;
