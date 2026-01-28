import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import ImageUpload from './ImageUpload';
import './AdminGallery.css';

const AdminGallery = () => {
  const { content, addGalleryImage, removeGalleryImage } = useContent();
  const [isUploading, setIsUploading] = useState(false);
  const galleryImages = content.about?.galleryImages || [];

  const handleImageUpload = async (imageUrl) => {
    setIsUploading(true);
    try {
      await addGalleryImage(imageUrl);
    } catch (error) {
      console.error('Error adding gallery image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async (index) => {
    if (window.confirm('Are you sure you want to remove this image?')) {
      try {
        await removeGalleryImage(index);
      } catch (error) {
        console.error('Error removing gallery image:', error);
      }
    }
  };

  return (
    <div className="admin-gallery">
      <div className="admin-gallery-header">
        <h3>Gallery Management</h3>
        <p>Manage the facility gallery images displayed on the website</p>
      </div>

      <div className="admin-gallery-upload">
        <h4>Add New Image</h4>
        <ImageUpload
          onImageChange={handleImageUpload}
          currentImage=""
          placeholder="Upload gallery image"
          accept="image/*"
          disabled={isUploading}
        />
        {isUploading && (
          <div className="upload-status">
            <span>Uploading image...</span>
          </div>
        )}
      </div>

      <div className="admin-gallery-grid">
        <h4>Current Gallery Images ({galleryImages.length})</h4>
        {galleryImages.length === 0 ? (
          <div className="empty-gallery">
            <p>No gallery images yet. Upload your first image above.</p>
          </div>
        ) : (
          <div className="gallery-images">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-image-item">
                <div className="image-container">
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`}
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveImage(index)}
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="image-info">
                  <span>Image {index + 1}</span>
                  <small>{Math.round(image.length / 1024)} KB</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-gallery-tips">
        <h4>Tips for Gallery Images:</h4>
        <ul>
          <li>Use high-quality images that showcase your facility</li>
          <li>Recommended size: 1200x900 pixels (4:3 ratio)</li>
          <li>Images will be automatically compressed for optimal loading</li>
          <li>Good images include: reception, consultation rooms, equipment, waiting area</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminGallery;
