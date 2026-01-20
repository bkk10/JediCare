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
      // For now, return empty content (localStorage will handle it)
      return res.status(200).json({
        hero: { title: "Jedi Medical Centre", subtitle: "Level 3 Healthcare Facility" },
        about: { title: "About Jedi Medical Centre" },
        testimonials: [],
        team: [],
        contact: { phone: "+254 XXX XXX XXX", email: "info@jedicare.co.ke" },
        services: []
      });
    }

    if (req.method === 'POST') {
      // Just return success - localStorage is the real storage
      return res.status(200).json({ 
        success: true,
        message: 'Content saved successfully (localStorage)'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
