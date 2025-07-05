import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useData } from '../../contexts/DataContext';

const { FiUpload, FiTrash2, FiEye, FiDownload, FiImage, FiFile, FiX } = FiIcons;

const AdminMedia = () => {
  const { media, addMedia, deleteMedia } = useData();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

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
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const mediaItem = {
          name: file.name,
          type: file.type,
          size: file.size,
          url: e.target.result,
          isImage: file.type.startsWith('image/')
        };
        
        addMedia(mediaItem);
        toast.success('File uploaded successfully!');
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      deleteMedia(id);
      toast.success('File deleted successfully!');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const openPreview = (item) => {
    setSelectedFile(item);
  };

  const closePreview = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Media Library</h1>
        <p className="text-gray-600">Upload and manage your media files.</p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <SafeIcon icon={FiUpload} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h3>
          <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
          <input
            type="file"
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
            onChange={handleChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <SafeIcon icon={FiUpload} className="w-4 h-4" />
            <span>Choose Files</span>
          </label>
          <p className="text-xs text-gray-500 mt-2">Maximum file size: 5MB</p>
        </div>
      </motion.div>

      {/* Media Grid */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Media Files ({media.length})
        </h2>
        
        {media.length === 0 ? (
          <div className="text-center py-12">
            <SafeIcon icon={FiImage} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No media files uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square mb-3 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {item.isImage ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <SafeIcon icon={FiFile} className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(item.size)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.uploadedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openPreview(item)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Preview"
                    >
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </button>
                    <a
                      href={item.url}
                      download={item.name}
                      className="text-green-600 hover:text-green-800"
                      title="Download"
                    >
                      <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{selectedFile.name}</h2>
              <button
                onClick={closePreview}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center">
              {selectedFile.isImage ? (
                <img
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  className="max-w-full max-h-96 mx-auto rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <SafeIcon icon={FiFile} className="w-16 h-16 text-gray-400" />
                  <p className="text-gray-600">Preview not available for this file type</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Size:</span>
                  <span className="ml-2 text-gray-600">{formatFileSize(selectedFile.size)}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <span className="ml-2 text-gray-600">{selectedFile.type}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Uploaded:</span>
                  <span className="ml-2 text-gray-600">
                    {new Date(selectedFile.uploadedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMedia;