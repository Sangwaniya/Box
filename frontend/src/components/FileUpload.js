import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
      onFileUpload(); // Notify parent to refresh file list
    } catch (error) {
      setMessage('Failed to upload the file.');
      console.error(error);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 border border-gray-300 rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
