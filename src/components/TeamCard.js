import React from 'react';
import { User, Award, Heart, Mail, Phone } from 'lucide-react';

const TeamCard = ({ member }) => {
  if (!member) {
    return null; // Don't render anything if no team member
  }

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 relative">
      {/* Image section */}
      <div className="relative h-64 overflow-hidden">
        {member.image ? (
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 flex items-center justify-center">
            <User className="h-20 w-20 text-primary-400 group-hover:scale-110 transition-transform" />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick contact icons */}
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Mail className="h-4 w-4 text-gray-700" />
          </div>
          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Phone className="h-4 w-4 text-gray-700" />
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-6 relative">
        {/* Decorative element */}
        <div className="absolute -top-4 left-6 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
          <Award className="h-4 w-4 text-yellow-500" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">
          {member.name}
        </h3>
        <p className="text-primary-600 font-semibold mb-2">{member.title}</p>
        <p className="text-gray-600 text-sm mb-3">{member.specialty}</p>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
            <Award className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-gray-700 font-medium">{member.experience}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {member.bio}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-primary-600">
            <Heart className="h-4 w-4 group-hover:animate-pulse" />
            <span className="text-sm font-medium">Dedicated to your health</span>
          </div>
          <div className="text-primary-600 group-hover:text-primary-700 transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
