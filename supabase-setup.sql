-- Create content table for JediCare CMS
CREATE TABLE IF NOT EXISTS content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert initial content
INSERT INTO content (data) VALUES ('{
  "hero": {
    "title": "Jedi Medical Centre",
    "subtitle": "Level 3 Healthcare Facility",
    "description": "Your trusted healthcare partner in Kapsoya",
    "backgroundImage": "",
    "logo": "",
    "welcomeMessage": "Your Health, Our Priority - Caring for Kapsoya Families Since 2020"
  },
  "about": {
    "title": "About Jedi Medical Centre",
    "mainText": "Jedi Medical Centre is a fully operational Level 3 healthcare facility dedicated to providing quality medical services to the Kapsoya community and greater Uasin Gishu region.",
    "secondaryText": "Our commitment is to deliver accessible, reliable, and compassionate care that meets the diverse health needs of our community. We combine modern medical expertise with a deep understanding of local healthcare challenges.",
    "galleryImages": []
  },
  "testimonials": [],
  "team": [],
  "contact": {
    "phone": "+254 XXX XXX XXX",
    "email": "info@jedicare.co.ke",
    "address": "Kapsoya Ward, Ainabkoi Constituency, Uasin Gishu County",
    "hours": {
      "weekdays": "Mon - Sat: 8:00 AM - 8:00 PM",
      "sunday": "Sunday: 9:00 AM - 6:00 PM"
    },
    "emergencyHotline": "+254 700 000 000",
    "mapImage": ""
  },
  "services": []
}') ON CONFLICT DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Allow all operations on content table
CREATE POLICY "Allow all operations on content" ON content
  FOR ALL USING (true)
  WITH CHECK (true);
