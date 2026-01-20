import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Load content from Vercel KV
      const content = await kv.get('jedicare-content');
      
      if (content) {
        return res.status(200).json(JSON.parse(content));
      } else {
        // Return default content if nothing stored
        return res.status(200).json({
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
          contact: { phone: "+254 XXX XXX XXX", email: "info@jedicare.co.ke" },
          services: []
        });
      }
    }

    if (req.method === 'POST') {
      // Save content to Vercel KV
      await kv.set('jedicare-content', JSON.stringify(req.body));
      
      return res.status(200).json({ 
        success: true,
        message: 'Content saved successfully to Vercel KV'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
