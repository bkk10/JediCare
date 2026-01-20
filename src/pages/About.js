import React from 'react';
import { useContent } from '../contexts/ContentContext';

const About = () => {
  const { content } = useContent();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {content.about.title}
          </h1>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.about.mainText}
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.about.secondaryText}
            </p>
          </div>
        </div>

        {/* Gallery */}
        {content.about.galleryImages && content.about.galleryImages.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Our Facility
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {content.about.galleryImages.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
