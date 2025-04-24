import React, { useState, useRef } from 'react';
import Compress from 'compress.js';

const UploadForm = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const compress = new Compress();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Check file type
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPG, PNG, etc.)');
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Please upload a photo less than 5MB');
      return;
    }

    setError('');

    // Compress image
    compress.compress([file], {
      size: 4,
      quality: 0.75,
      maxWidth: 1200,
      maxHeight: 1200,
      resize: true
    }).then((results) => {
      const img = results[0];
      const base64str = img.data;
      const imgExt = img.ext;
      const dataUrl = `data:image/${imgExt};base64,${base64str}`;

      setPreview(dataUrl);
      
      // Pass compressed image to parent component
      if (onImageUpload) {
        onImageUpload(dataUrl);
      }
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-6">
      <label className="block text-dark text-sm font-medium mb-2">Upload Photo</label>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
          dragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*" 
          onChange={handleChange} 
        />
        
        {preview ? (
          <div className="w-full flex flex-col items-center">
            <img 
              src={preview} 
              alt="Photo preview" 
              className="max-h-64 max-w-full mb-4 rounded-lg shadow-sm" 
            />
            <p className="text-sm text-gray-500">Click or drag to change photo</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="mb-2 text-sm text-gray-700"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PNG or JPG format (max 5MB)</p>
            <p className="mt-2 text-xs text-gray-500">High-resolution, front-facing photos work best</p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default UploadForm; 