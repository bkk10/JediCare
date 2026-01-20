import React from 'react';
import { Star, MapPin, User, MessageSquare } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 transition-all duration-300 ${
          i < rating ? 'text-yellow-400 fill-current drop-shadow-sm' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!testimonial) {
    return null; // Don't render anything if no testimonial
  }

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"></div>
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center ring-2 ring-white shadow-md group-hover:scale-110 transition-transform">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{testimonial.name}</h4>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              {testimonial.location}
            </div>
          </div>
        </div>
        <div className="flex space-x-1">
          {renderStars(testimonial.rating)}
        </div>
      </div>
      
      <blockquote className="text-gray-700 italic mb-4 leading-relaxed relative z-10">
        <MessageSquare className="absolute top-0 left-0 h-8 w-8 text-primary-200 -rotate-12" />
        <span className="relative pl-8">"{testimonial.story}"</span>
      </blockquote>
      
      <div className="flex items-center justify-between text-sm relative z-10">
        <span className="bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 px-3 py-1 rounded-full font-medium border border-primary-200">
          {testimonial.treatment}
        </span>
        <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Age {testimonial.age}
        </span>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default TestimonialCard;
