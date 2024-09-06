import React from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">File Upload & Download</h1>
      <FileUpload />
      <FileList />
    </div>
  );
}

export default App;
