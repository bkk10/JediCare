import React, { createContext, useState, useContext, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  // Default content
  const defaultContent = {
    hero: {
      title: "Jedi Medical Centre",
      subtitle: "Level 3 Healthcare Facility",
      description: "Your trusted healthcare partner in Kapsoya",
      backgroundImage: "",
      logo: "",
      welcomeMessage: "Your Health, Our Priority - Caring for Kapsoya Families Since 2020"
    },
    about: {
      title: "About Jedi Medical Centre",
      mainText: "Jedi Medical Centre is a fully operational Level 3 healthcare facility dedicated to providing quality medical services to the Kapsoya community and greater Uasin Gishu region.",
      secondaryText: "Our commitment is to deliver accessible, reliable, and compassionate care that meets the diverse health needs of our community. We combine modern medical expertise with a deep understanding of local healthcare challenges.",
      galleryImages: []
    },
    testimonials: [],
    team: [],
    contact: {
      phone: "+254 XXX XXX XXX",
      email: "info@jedicare.co.ke",
      address: "Kapsoya Ward, Ainabkoi Constituency, Uasin Gishu County",
      hours: {
        weekdays: "Mon - Sat: 8:00 AM - 8:00 PM",
        sunday: "Sunday: 9:00 AM - 6:00 PM"
      },
      emergencyHotline: "+254 700 000 000",
      mapImage: ""
    },
    services: []
  };

  const [content, setContent] = useState(defaultContent);

  // IndexedDB setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const request = indexedDB.open('JediCareDB', 1, 'JediCare Content Database');
      
      request.onerror = () => {
        console.error('IndexedDB failed to open');
      };
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        
        // Load content from IndexedDB
        const transaction = db.transaction(['content'], 'readonly');
        const objectStore = transaction.objectStore('content');
        const getRequest = objectStore.get('main');
        
        getRequest.onsuccess = (event) => {
          if (event.target.result) {
            setContent(event.target.result);
            console.log('✅ Content loaded from IndexedDB');
          } else {
            console.log('📝 No content in IndexedDB, using defaults');
          }
        };
        
        getRequest.onerror = () => {
          console.error('❌ Failed to load from IndexedDB');
        };
      };
    }
  }, []);

  // Save to IndexedDB whenever content changes
  const saveToIndexedDB = (dataToSave) => {
    if (typeof window !== 'undefined') {
      const request = indexedDB.open('JediCareDB', 1);
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['content'], 'readwrite');
        const objectStore = transaction.objectStore('content');
        const putRequest = objectStore.put(dataToSave, 'main');
        
        putRequest.onsuccess = () => {
          console.log('✅ Content saved to IndexedDB');
        };
        
        putRequest.onerror = () => {
          console.error('❌ Failed to save to IndexedDB');
        };
      };
    }
  };

  const updateContent = (section, data) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        [section]: data
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const updateService = (id, serviceData) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        services: prev.services.map(service => 
          service.id === id ? { ...service, ...serviceData } : service
        )
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const addService = (serviceData) => {
    const newService = {
      id: Date.now(),
      image: "",
      ...serviceData
    };
    setContent(prev => {
      const newContent = {
        ...prev,
        services: [...prev.services, newService]
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const deleteService = (id) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        services: prev.services.filter(service => service.id !== id)
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        reject(new Error('No file provided'));
      }
    });
  };

  const addGalleryImage = (imageUrl) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        about: {
          ...prev.about,
          galleryImages: [...prev.about.galleryImages, imageUrl]
        }
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const removeGalleryImage = (index) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        about: {
          ...prev.about,
          galleryImages: prev.about.galleryImages.filter((_, i) => i !== index)
        }
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const addTestimonial = (testimonial) => {
    const newTestimonial = {
      id: Date.now(),
      ...testimonial
    };
    setContent(prev => {
      const newContent = {
        ...prev,
        testimonials: [...prev.testimonials, newTestimonial]
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const updateTestimonial = (id, testimonialData) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        testimonials: prev.testimonials.map(testimonial => 
          testimonial.id === id ? { ...testimonial, ...testimonialData } : testimonial
        )
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const deleteTestimonial = (id) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        testimonials: prev.testimonials.filter(testimonial => testimonial.id !== id)
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const updateTeamMember = (id, teamData) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        team: prev.team.map(member => 
          member.id === id ? { ...member, ...teamData } : member
        )
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const deleteTeamMember = (id) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        team: prev.team.filter(member => member.id !== id)
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const addTeamMember = (teamData) => {
    const newMember = {
      id: Date.now(),
      image: "",
      ...teamData
    };
    setContent(prev => {
      const newContent = {
        ...prev,
        team: [...prev.team, newMember]
      };
      saveToIndexedDB(newContent);
      return newContent;
    });
  };

  const value = {
    content,
    updateContent,
    updateService,
    addService,
    deleteService,
    uploadImage,
    addGalleryImage,
    removeGalleryImage,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateTeamMember,
    deleteTeamMember,
    addTeamMember
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
