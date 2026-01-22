import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({
    hero: {
      title: "Jedi Medical Centre",
      subtitle: "Level 3 Healthcare Facility",
      description: "Your trusted healthcare partner in Kapsoya",
      backgroundImage: "",
      logo: "",
      welcomeMessage: "Your Health, Our Priority - Caring for Kapsoya Families Since 2020"
    },
    about: {
      title: "About JWe provide compassionate, affordable, and reliable medical care for individuals and families, with a commitment to quality treatment, dignity, and community well-being.edi Medical Centre",
      mainText: "Jedi Medical Centre is a fully operational Level 3 healthcare facility dedicated to providing quality medical services to Kapsoya community and greater Uasin Gishu region.",
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
        story: "After my accident, emergency response was quick and professional. The follow-up care helped me recover completely. Thank you Jedi team!",
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
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    console.log('🔄 Loading content from Supabase...');
    
    // Performance tracking
    const startTime = performance.now();
    
    // Check cache first
    const CACHE_KEY = 'jedicare_content';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(`${CACHE_KEY}_time`);
    
    if (cached && cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_DURATION) {
      setContent(JSON.parse(cached));
      console.log('📦 Loaded from cache');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('content')
        .select('data')
        .eq('id', 1)
        .single()
        .throwOnError();

      if (error) {
        throw error;
      }

      if (data?.data) {
        setContent(data.data);
        console.log('✅ Loaded from Supabase');
        
        // Cache the result
        localStorage.setItem(CACHE_KEY, JSON.stringify(data.data));
        localStorage.setItem(`${CACHE_KEY}_time`, Date.now().toString());
        console.log('💾 Content cached for 5 minutes');
        
        // Performance logging
        const loadTime = performance.now() - startTime;
        console.log(`⚡ Content loaded in ${loadTime.toFixed(2)}ms`);
        
        if (loadTime > 1000) {
          console.warn('🐌 Slow content load detected');
        }
        
        return;
      }
    } catch (error) {
      console.warn('⚠️ Supabase failed, using default content', error.message);
      console.log('📝 Using default content');
    }
  };

  const saveContent = async (dataToSave) => {
    console.log('💾 Saving to Supabase...');

    try {
      const { error } = await supabase
        .from('content')
        .upsert({
          id: 1,
          data: dataToSave,
          updated_at: new Date()
        });

      if (!error) {
        console.log('✅ Saved to Supabase');
        return true;
      } else {
        throw error;
      }
    } catch (error) {
      console.error('❌ Supabase save failed:', error.message);
      return false;
    }
  };

  const updateContent = async (section, data) => {
    const newContent = {
      ...content,
      [section]: data
    };
    setContent(newContent);
    await saveContent(newContent);
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
  };

  const deleteService = async (id) => {
    const newContent = {
      ...content,
      services: content.services.filter(service => service.id !== id)
    };
    setContent(newContent);
    await saveContent(newContent);
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
  };

  const deleteTestimonial = async (id) => {
    const newContent = {
      ...content,
      testimonials: content.testimonials.filter(testimonial => testimonial.id !== id)
    };
    setContent(newContent);
    await saveContent(newContent);
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
  };

  const deleteTeamMember = async (id) => {
    const newContent = {
      ...content,
      team: content.team.filter(member => member.id !== id)
    };
    setContent(newContent);
    await saveContent(newContent);
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
