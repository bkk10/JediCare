import React, { createContext, useState, useContext } from 'react';

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

  // Load content from server API
  const loadContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
        console.log('✅ Content loaded from server');
        return data;
      } else {
        console.log('📝 No server content, using defaults');
        return defaultContent;
      }
    } catch (error) {
      console.error('❌ Failed to load from server:', error);
      return defaultContent;
    }
  };

  // Save content to server API
  const saveContent = async (dataToSave) => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave)
      });
      
      if (response.ok) {
        console.log('✅ Content saved to server');
      } else {
        console.error('❌ Failed to save to server');
      }
    } catch (error) {
      console.error('❌ Server save error:', error);
    }
  };

  // Load content on mount
  useEffect(() => {
    loadContent();
  }, []);

  const updateContent = async (section, data) => {
    const newContent = {
      ...content,
      [section]: data
    };
    setContent(newContent);
    await saveContent(newContent);
    return newContent;
  };

  const updateService = async (id, serviceData) => {
    const newContent = {
      ...content,
      services: content.services.map(service => 
        service.id === id ? { ...service, ...serviceData } : service
      )
    };
    setContent(newContent);
    await saveContent(newContent);
    return newContent;
  };

  const addService = async (serviceData) => {
    const newService = {
      id: Date.now(),
      image: "",
      ...serviceData
    };
    const newContent = {
      ...content,
      services: [...content.services, newService]
    };
    setContent(newContent);
    await saveContent(newContent);
    return newService;
  };

  const deleteService = async (id) => {
    const newContent = {
      ...content,
      services: content.services.filter(service => service.id !== id)
    };
    setContent(newContent);
    await saveContent(newContent);
    return newContent;
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

  const addGalleryImage = async (imageUrl) => {
    const newContent = {
      ...content,
      about: {
        ...content.about,
        galleryImages: [...content.about.galleryImages, imageUrl]
      }
    };
    setContent(newContent);
    await saveContent(newContent);
    return newContent;
  };

  const removeGalleryImage = async (index) => {
    const newContent = {
      ...content,
      about: {
        ...content.about,
        galleryImages: content.about.galleryImages.filter((_, i) => i !== index)
      }
    };
    setContent(newContent);
    await saveContent(newContent);
    return newContent;
  };

  const addTestimonial = async (testimonial) => {
    const newTestimonial = {
      id: Date.now(),
      ...testimonial
    };
    const newContent = {
      ...content,
      testimonials: [...content.testimonials, newTestimonial]
    };
    setContent(newContent);
    await saveContent(newContent);
    return newContent;
  };

  const updateTestimonial = async (id, testimonialData) => {
    const newContent = {
      ...content,
      testimonials: content.testimonials.map(testimonial => 
        testimonial.id === id ? { ...testimonial, ...testimonialData } : testimonial
      )
    };
    setContent(newContent);
    await saveContent(newContent);
    return newContent;
  };

  const deleteTestimonial = async (id) => {
    const newContent = {
      ...content,
      testimonials: content.testimonials.filter(testimonial => testimonial.id !== id)
    };
    setContent(newContent);
    await saveContent(newContent);
    return newContent;
  };

  const updateTeamMember = async (id, teamData) => {
    const newContent = {
      ...content,
      team: content.team.map(member => 
        member.id === id ? { ...member, ...teamData } : member
      )
    };
    setContent(newContent);
    await saveContent(newContent);
    return newContent;
  };

  const deleteTeamMember = async (id) => {
    const newContent = {
      ...content,
      team: content.team.filter(member => member.id !== id)
    };
    setContent(newContent);
    await saveContent(newContent);
    return newContent;
  };

  const addTeamMember = async (teamData) => {
    const newMember = {
      id: Date.now(),
      image: "",
      ...teamData
    };
    const newContent = {
      ...content,
      team: [...content.team, newMember]
    };
    setContent(newContent);
    await saveContent(newContent);
    return newMember;
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
