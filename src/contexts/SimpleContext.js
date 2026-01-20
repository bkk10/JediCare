import React, { createContext, useState, useContext } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

// Simple hardcoded content that persists across refreshes
const defaultContent = {
  hero: {
    title: "Jedi Medical Centre",
    subtitle: "Level 3 Healthcare Facility", 
    description: "Your trusted healthcare partner in Kapsoya",
    backgroundImage: "", // You can update this path
    logo: "", // You can update this path  
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
      image: "", // You can update this with actual image path
      bio: "Dr. Kipruto is passionate about community health and has dedicated his career to serving the people of Uasin Gishu County."
    },
    {
      id: 2,
      name: "Dr. Sarah Cheptoo",
      title: "Head of Pediatrics",
      specialty: "Pediatrics & Child Health",
      experience: "10+ years",
      image: "", // You can update this with actual image path
      bio: "Dr. Cheptoo loves working with children and believes every child deserves the best start in life."
    },
    {
      id: 3,
      name: "Dr. James Kiplagat",
      title: "Senior Medical Officer",
      specialty: "General Practice", 
      experience: "8+ years",
      image: "", // You can update this with actual image path
      bio: "Dr. Kiplagat is known for his compassionate approach and dedication to patient education."
    }
  ],
  contact: {
    phone: "+254 XXX XXX XXX", // Update with actual phone
    email: "info@jedicare.co.ke", // Update with actual email
    address: "Kapsoya Ward, Ainabkoi Constituency, Uasin Gishu County",
    hours: {
      weekdays: "Mon - Sat: 8:00 AM - 8:00 PM",
      sunday: "Sunday: 9:00 AM - 6:00 PM"
    },
    emergencyHotline: "+254 700 000 000", // Update with actual emergency number
    mapImage: "" // You can update this with actual map image
  },
  services: [
    {
      id: 1,
      title: "Doctor Consultation",
      subtitle: "General Consultations",
      description: "Assessment and treatment for everyday concerns with clear next steps.",
      image: "" // You can update this with actual service image
    },
    {
      id: 2,
      title: "Medical Diagnostics",
      subtitle: "Diagnostics",
      description: "Laboratory tests and imaging to support accurate, timely diagnoses.",
      image: "" // You can update this with actual service image
    },
    {
      id: 3,
      title: "Medical Treatment",
      subtitle: "Treatment & Follow‑up",
      description: "Evidence-based treatments and attentive follow-up for recovery and continuity.",
      image: "" // You can update this with actual service image
    },
    {
      id: 4,
      title: "Preventive Care",
      subtitle: "Preventive Care",
      description: "Vaccinations, screenings, and wellness checks to keep you ahead of issues.",
      image: "" // You can update this with actual service image
    },
    {
      id: 5,
      title: "Eye Examination",
      subtitle: "Optician Services",
      description: "Comprehensive eye exams, prescriptions, and glasses sales with curated frames.",
      image: "" // You can update this with actual service image
    },
    {
      id: 6,
      title: "Community Healthcare",
      subtitle: "Community-Focused Care",
      description: "Accessible care for Kapsoya and greater Uasin Gishu—reliable and close to home.",
      image: "" // You can update this with actual service image
    }
  ]
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);

  // Simple update functions that modify the hardcoded content
  const updateContent = (section, data) => {
    const newContent = {
      ...content,
      [section]: data
    };
    setContent(newContent);
    console.log('✅ Content updated (hardcoded)');
    return newContent;
  };

  const updateService = (id, serviceData) => {
    const newContent = {
      ...content,
      services: content.services.map(service => 
        service.id === id ? { ...service, ...serviceData } : service
      )
    };
    setContent(newContent);
    console.log('✅ Service updated (hardcoded)');
    return newContent;
  };

  const addService = (serviceData) => {
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
    console.log('✅ Service added (hardcoded)');
    return newService;
  };

  const deleteService = (id) => {
    const newContent = {
      ...content,
      services: content.services.filter(service => service.id !== id)
    };
    setContent(newContent);
    console.log('✅ Service deleted (hardcoded)');
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

  const addGalleryImage = (imageUrl) => {
    const newContent = {
      ...content,
      about: {
        ...content.about,
        galleryImages: [...content.about.galleryImages, imageUrl]
      }
    };
    setContent(newContent);
    console.log('✅ Gallery image added (hardcoded)');
    return newContent;
  };

  const removeGalleryImage = (index) => {
    const newContent = {
      ...content,
      about: {
        ...content.about,
        galleryImages: content.about.galleryImages.filter((_, i) => i !== index)
      }
    };
    setContent(newContent);
    console.log('✅ Gallery image removed (hardcoded)');
    return newContent;
  };

  const addTestimonial = (testimonial) => {
    const newTestimonial = {
      id: Date.now(),
      ...testimonial
    };
    const newContent = {
      ...content,
      testimonials: [...content.testimonials, newTestimonial]
    };
    setContent(newContent);
    console.log('✅ Testimonial added (hardcoded)');
    return newContent;
  };

  const updateTestimonial = (id, testimonialData) => {
    const newContent = {
      ...content,
      testimonials: content.testimonials.map(testimonial => 
        testimonial.id === id ? { ...testimonial, ...testimonialData } : testimonial
      )
    };
    setContent(newContent);
    console.log('✅ Testimonial updated (hardcoded)');
    return newContent;
  };

  const deleteTestimonial = (id) => {
    const newContent = {
      ...content,
      testimonials: content.testimonials.filter(testimonial => testimonial.id !== id)
    };
    setContent(newContent);
    console.log('✅ Testimonial deleted (hardcoded)');
    return newContent;
  };

  const updateTeamMember = (id, teamData) => {
    const newContent = {
      ...content,
      team: content.team.map(member => 
        member.id === id ? { ...member, ...teamData } : member
      )
    };
    setContent(newContent);
    console.log('✅ Team member updated (hardcoded)');
    return newContent;
  };

  const deleteTeamMember = (id) => {
    const newContent = {
      ...content,
      team: content.team.filter(member => member.id !== id)
    };
    setContent(newContent);
    console.log('✅ Team member deleted (hardcoded)');
    return newContent;
  };

  const addTeamMember = (teamData) => {
    const newMember = {
      id: Date.now(),
      image: "",
 // You can update this with actual image path
      ...teamData
    };
    const newContent = {
      ...content,
      team: [...content.team, newMember]
    };
    setContent(newContent);
    console.log('✅ Team member added (hardcoded)');
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
