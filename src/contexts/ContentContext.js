import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  // Load saved content from localStorage or use defaults
  const savedContent = typeof window !== 'undefined' ? localStorage.getItem('jedicare-content') : null;
  const initialContent = savedContent ? JSON.parse(savedContent) : {
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
    testimonials: [
      {
        id: 1,
        name: "Grace Wanjiru",
        age: 45,
        location: "Kapsoya",
        story: "The care I received at Jedi Medical Centre was exceptional. The doctors took time to understand my condition and explained everything clearly. I felt like family.",
        rating: 5,
        treatment: "Diabetes Management"
      },
      {
        id: 2,
        name: "Samuel Kiprop",
        age: 32,
        location: "Ainabkoi",
        story: "After my accident, the emergency response was quick and professional. The follow-up care helped me recover completely. Thank you Jedi team!",
        rating: 5,
        treatment: "Emergency Care"
      },
      {
        id: 3,
        name: "Miriam Chebet",
        age: 28,
        location: "Kapsoya",
        story: "The maternity services here are outstanding. The nurses were so supportive throughout my pregnancy and delivery. I felt safe and cared for.",
        rating: 5,
        treatment: "Maternity Care"
      }
    ],
    team: [
      {
        id: 1,
        name: "Dr. Michael Kipruto",
        title: "Medical Director",
        specialty: "Internal Medicine",
        experience: "15+ years",
        image: "",
        bio: "Dr. Kipruto is passionate about community health and has dedicated his career to serving the people of Uasin Gishu County."
      },
      {
        id: 2,
        name: "Dr. Sarah Cheptoo",
        title: "Head of Pediatrics",
        specialty: "Pediatrics & Child Health",
        experience: "10+ years",
        image: "",
        bio: "Dr. Cheptoo loves working with children and believes every child deserves the best start in life."
      },
      {
        id: 3,
        name: "Dr. James Kiplagat",
        title: "Senior Medical Officer",
        specialty: "General Practice",
        experience: "8+ years",
        image: "",
        bio: "Dr. Kiplagat is known for his compassionate approach and dedication to patient education."
      }
    ],
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
    services: [
      {
        id: 1,
        title: "Doctor Consultation",
        subtitle: "General Consultations",
        description: "Assessment and treatment for everyday concerns with clear next steps.",
        image: ""
      },
      {
        id: 2,
        title: "Medical Diagnostics",
        subtitle: "Diagnostics",
        description: "Laboratory tests and imaging to support accurate, timely diagnoses.",
        image: ""
      },
      {
        id: 3,
        title: "Medical Treatment",
        subtitle: "Treatment & Follow‑up",
        description: "Evidence-based treatments and attentive follow-up for recovery and continuity.",
        image: ""
      },
      {
        id: 4,
        title: "Preventive Care",
        subtitle: "Preventive Care",
        description: "Vaccinations, screenings, and wellness checks to keep you ahead of issues.",
        image: ""
      },
      {
        id: 5,
        title: "Eye Examination",
        subtitle: "Optician Services",
        description: "Comprehensive eye exams, prescriptions, and glasses sales with curated frames.",
        image: ""
      },
      {
        id: 6,
        title: "Community Healthcare",
        subtitle: "Community-Focused Care",
        description: "Accessible care for Kapsoya and greater Uasin Gishu—reliable and close to home.",
        image: ""
      }
    ]
  };

  const [content, setContent] = useState(initialContent);
  const timeoutRef = useRef(null);

  // Debounced save to localStorage
  const saveToStorage = (dataToSave) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('jedicare-content', JSON.stringify(dataToSave));
      } catch (error) {
        console.warn('localStorage quota exceeded, changes will not persist');
      }
    }
  };

  // Save to localStorage whenever content changes (debounced)
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('jedicare-content', JSON.stringify(content));
          console.log('Content saved to localStorage');
        } catch (error) {
          console.warn('localStorage quota exceeded, changes will not persist');
          // Fallback to memory storage if localStorage is full
        }
      }
    }, 1000); // Debounce for 1 second
  }, [content]);

  // Load content on mount and check for persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jedicare-content');
      if (saved) {
        try {
          const parsedContent = JSON.parse(saved);
          setContent(parsedContent);
          console.log('Content loaded from localStorage');
        } catch (error) {
          console.warn('Failed to parse saved content, using defaults');
        }
      }
    }
  }, []); // Empty dependency array = run only once on mount

  const updateContent = (section, data) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        [section]: data
      };
      saveToStorage(newContent); // Save immediately for important updates
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
      saveToStorage(newContent);
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
      saveToStorage(newContent);
      return newContent;
    });
  };

  const deleteService = (id) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        services: prev.services.filter(service => service.id !== id)
      };
      saveToStorage(newContent);
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
      saveToStorage(newContent);
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
      saveToStorage(newContent);
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
      saveToStorage(newContent);
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
      saveToStorage(newContent);
      return newContent;
    });
  };

  const deleteTestimonial = (id) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        testimonials: prev.testimonials.filter(testimonial => testimonial.id !== id)
      };
      saveToStorage(newContent);
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
      saveToStorage(newContent);
      return newContent;
    });
  };

  const deleteTeamMember = (id) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        team: prev.team.filter(member => member.id !== id)
      };
      saveToStorage(newContent);
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
      saveToStorage(newContent);
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
