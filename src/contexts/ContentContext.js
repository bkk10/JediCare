import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const [content, setContent] = useState(() => {
    // Preload from cache immediately for instant UI
    const CACHE_KEY = 'jedicare_content';
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // Fall back to default content
      }
    }
    
    // Default content as fallback
    return {
    hero: {
      title: "Jedi Medical Centre",
      subtitle: "Level 3 Healthcare Facility",
      description: "Your trusted healthcare partner in Kapsoya",
      backgroundImage: "",
      logo: "",
      welcomeMessage: "We provide compassionate, affordable, and reliable medical care for individuals and families, with a commitment to quality treatment, dignity, and community well-being."
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
    };
  });

  const loadContent = useCallback(async () => {
    console.log('🔄 Loading content...');
    
    // Check cache first with longer duration for better performance
    const CACHE_KEY = 'jedicare_content';
    const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes for faster UX
    
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(`${CACHE_KEY}_time`);
    
    // Always use cache first if available, then refresh in background
    if (cached && cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_DURATION) {
      setContent(JSON.parse(cached));
      console.log('⚡ Instant load from cache');
      
      // Background refresh without blocking UI
      refreshContentInBackground();
      return;
    }

    // If no cache, try Supabase with timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
      
      const { data, error } = await supabase
        .from('content')
        .select('data')
        .eq('id', 1)
        .single()
        .abortSignal(controller.signal)
        .throwOnError();

      clearTimeout(timeoutId);

      if (error) throw error;

      if (data?.data) {
        setContent(data.data);
        console.log('✅ Loaded from Supabase');
        
        // Cache the result
        localStorage.setItem(CACHE_KEY, JSON.stringify(data.data));
        localStorage.setItem(`${CACHE_KEY}_time`, Date.now().toString());
        console.log('💾 Content cached for 30 minutes');
        return;
      }
    } catch (error) {
      console.warn('⚠️ Supabase failed or timeout, using default content');
    }
    
    // Always have content ready immediately
    console.log('📝 Using default content');
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const refreshContentInBackground = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('data')
        .eq('id', 1)
        .single()
        .throwOnError();

      if (!error && data?.data) {
        const CACHE_KEY = 'jedicare_content';
        
        // Create cache-safe version
        const cacheSafeData = JSON.parse(JSON.stringify(data.data));
        
        // Remove large image data from cache
        if (cacheSafeData.hero?.backgroundImage && cacheSafeData.hero.backgroundImage.length > 100000) {
          cacheSafeData.hero.backgroundImage = "";
        }
        
        if (cacheSafeData.about?.galleryImages) {
          cacheSafeData.about.galleryImages = cacheSafeData.about.galleryImages.map(img => 
            img.length > 100000 ? "" : img
          );
        }
        
        if (cacheSafeData.team) {
          cacheSafeData.team = cacheSafeData.team.map(member => ({
            ...member,
            image: member.image && member.image.length > 100000 ? "" : member.image
          }));
        }
        
        if (cacheSafeData.services) {
          cacheSafeData.services = cacheSafeData.services.map(service => ({
            ...service,
            image: service.image && service.image.length > 100000 ? "" : service.image
          }));
        }
        
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheSafeData));
        localStorage.setItem(`${CACHE_KEY}_time`, Date.now().toString());
        
        // Update state with full data (including images)
        setContent(data.data);
        console.log('🔄 Background refresh completed');
      }
    } catch (error) {
      console.log('🔄 Background refresh failed, will retry later');
    }
  };

  const saveContent = async (dataToSave) => {
    console.log('💾 Saving to Supabase...');
    
    // Create cache-safe version without large images
    const CACHE_KEY = 'jedicare_content';
    const cacheSafeData = JSON.parse(JSON.stringify(dataToSave));
    
    // Remove large image data from cache to prevent quota exceeded
    if (cacheSafeData.hero?.backgroundImage && cacheSafeData.hero.backgroundImage.length > 100000) {
      cacheSafeData.hero.backgroundImage = "";
    }
    
    // Remove large images from gallery
    if (cacheSafeData.about?.galleryImages) {
      cacheSafeData.about.galleryImages = cacheSafeData.about.galleryImages.map(img => 
        img.length > 100000 ? "" : img
      );
    }
    
    // Remove large team images
    if (cacheSafeData.team) {
      cacheSafeData.team = cacheSafeData.team.map(member => ({
        ...member,
        image: member.image && member.image.length > 100000 ? "" : member.image
      }));
    }
    
    // Remove large service images
    if (cacheSafeData.services) {
      cacheSafeData.services = cacheSafeData.services.map(service => ({
        ...service,
        image: service.image && service.image.length > 100000 ? "" : service.image
      }));
    }
    
    // Cache the optimized version
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheSafeData));
    localStorage.setItem(`${CACHE_KEY}_time`, Date.now().toString());

    try {
      // Save full data to Supabase (including images) with much longer timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const { error } = await supabase
        .from('content')
        .upsert({
          id: 1,
          data: dataToSave, // Full data with images
          updated_at: new Date()
        })
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (!error) {
        console.log('✅ Saved to Supabase');
        return true;
      } else {
        throw error;
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('⏰ Supabase save timed out after 30 seconds, but cached locally');
      } else if (error.message?.includes('413') || error.message?.includes('too large')) {
        console.warn('📦 File too large for Supabase, but cached locally');
      } else {
        console.error('❌ Supabase save failed, but cached locally:', error.message);
      }
      // Still return true since content is cached locally
      return true;
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
          const result = reader.result;
          
          // Compress large images before returning
          if (result.length > 500000) { // If larger than 500KB
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              // Calculate new dimensions (max 800px width/height)
              let { width, height } = img;
              const maxSize = 800;
              
              if (width > height) {
                if (width > maxSize) {
                  height *= maxSize / width;
                  width = maxSize;
                }
              } else {
                if (height > maxSize) {
                  width *= maxSize / height;
                  height = maxSize;
                }
              }
              
              canvas.width = width;
              canvas.height = height;
              
              // Draw and compress
              ctx.drawImage(img, 0, 0, width, height);
              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
              
              console.log(`🗜️ Image compressed from ${Math.round(result.length / 1024)}KB to ${Math.round(compressedDataUrl.length / 1024)}KB`);
              resolve(compressedDataUrl);
            };
            img.src = result;
          } else {
            resolve(result);
          }
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
