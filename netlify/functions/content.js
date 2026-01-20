const fs = require('fs');
const path = require('path');

// Path to store content data
const dataPath = path.join(__dirname, '../../data/content.json');

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

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Load content
      const content = readContent();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(content || {
          hero: { title: "Jedi Medical Centre", subtitle: "Level 3 Healthcare Facility" },
          about: { title: "About Jedi Medical Centre" },
          testimonials: [],
          team: [],
          contact: { phone: "+254 XXX XXX XXX", email: "info@jedicare.co.ke" },
          services: []
        })
      };
    }

    if (event.httpMethod === 'POST') {
      // Save content
      const data = JSON.parse(event.body);
      const success = writeContent(data);
      
      return {
        statusCode: success ? 200 : 500,
        headers,
        body: JSON.stringify({ 
          success,
          message: success ? 'Content saved successfully' : 'Failed to save content'
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
