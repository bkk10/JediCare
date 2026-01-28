import React, { useState, useEffect, useCallback } from 'react';
import { useContent } from '../contexts/ContentContext';
import './Gallery.css';

const Gallery = () => {
  const { content } = useContent();
  const galleryImages = content.about?.galleryImages || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const navigateImage = useCallback((direction) => {
    if (direction === 'prev') {
      setSelectedImageIndex((prev) => prev === 0 ? galleryImages.length - 1 : prev - 1);
    } else {
      setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
    }
  }, [galleryImages.length]);

  // Keyboard navigation - move this before the early return
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, galleryImages.length, navigateImage]);

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <>
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <h2>Our Facility</h2>
            <p>Take a virtual tour of our state-of-the-art medical facility and see where healing happens</p>
          </div>
          
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="gallery-item"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                aria-label={`View gallery image ${index + 1}`}
              >
                <img 
                  src={image} 
                  alt={`JediCare Facility ${index + 1}`}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span>View Image</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      {selectedImageIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button 
            className="lightbox-close" 
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          
          {galleryImages.length > 1 && (
            <>
              <button 
                className="lightbox-nav lightbox-prev" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button 
                className="lightbox-nav lightbox-next" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
          
          <img 
            src={galleryImages[selectedImageIndex]} 
            alt={`JediCare Facility ${selectedImageIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          
          {galleryImages.length > 1 && (
            <div className="lightbox-counter">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Gallery;
