import React from 'react';
import { memo } from 'react';

const ServiceCard = memo(({ service, onEdit, onDelete }) => {
  console.log('ServiceCard rendered:', service.id); // Track re-renders
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.subtitle}</p>
      <p className="text-gray-700 mb-4">{service.description}</p>
      
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(service)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(service.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
