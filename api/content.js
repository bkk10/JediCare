import fs from 'fs';
import path from 'path';

// Path to store content data
const dataPath = path.join(process.cwd(), 'data', 'content.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Read content from file
const readContent = () => {
  try {
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading content:', error);
  }
  return null;
};

// Write content to file
const writeContent = (data) => {
  try {
    ensureDataDir();
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing content:', error);
    return false;
  }
};

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
      // Load content
      const content = readContent();
      
      return res.status(200).json(content || {
        hero: { title: "Jedi Medical Centre", subtitle: "Level 3 Healthcare Facility" },
        about: { title: "About Jedi Medical Centre" },
        testimonials: [],
        team: [],
        contact: { phone: "+254 XXX XXX XXX", email: "info@jedicare.co.ke" },
        services: []
      });
    }

    if (req.method === 'POST') {
      // Save content
      const success = writeContent(req.body);
      
      return res.status(success ? 200 : 500).json({ 
        success,
        message: success ? 'Content saved successfully' : 'Failed to save content'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
