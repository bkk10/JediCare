# JediCare Medical Centre Website

A modern, responsive healthcare website for jedicare Medical Centre with an integrated admin panel for content management.

## Features

### Main Website
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with React and Tailwind CSS for a clean, professional look
- **Services Section**: Comprehensive display of all healthcare services
- **About Section**: Information about the medical centre
- **Contact Information**: Easy access to contact details and working hours
- **Navigation**: Intuitive navigation with smooth scrolling

### Admin Panel
- **Secure Login**: Password-protected admin access
- **Content Management**: Edit all website content without touching code
- **Hero Section Management**: Update titles, subtitles, and descriptions
- **About Section Editor**: Modify about page content
- **Services Management**: Add, edit, and delete healthcare services
- **Contact Information**: Update phone numbers, email, address, and working hours
- **Real-time Updates**: Changes are reflected immediately on the website

## Services Included

1. **Doctor Consultation** - General consultations with clear next steps
2. **Medical Diagnostics** - Laboratory tests and imaging services
3. **Medical Treatment** - Evidence-based treatments and follow-up care
4. **Preventive Care** - Vaccinations, screenings, and wellness checks
5. **Eye Examination** - Comprehensive eye exams and optician services
6. **Community Healthcare** - Accessible care for Kapsoya and Uasin Gishu

## Technology Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React
- **Authentication**: Custom React Context
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd JediCare
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

### Admin Access

To access the admin panel:
1. Navigate to `/admin` or click the "Admin" button in the navigation
2. Use the following default credentials:
   - **Username**: `admin`
   - **Password**: `JediCare123`

**Important**: Change these credentials in production for security.

## Project Structure

```
JediCare/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   └── ProtectedRoute.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── ContentContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── AdminLogin.js
│   │   └── AdminDashboard.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
├── tailwind.config.js
└── README.md
```

## Customization

### Adding New Services
1. Log in to the admin panel
2. Navigate to the "Services" tab
3. Use the "Add New Service" form to add new healthcare services
4. Fill in the title, subtitle, and description
5. Click "Add Service"

### Modifying Content
1. Access the admin panel
2. Select the section you want to edit (Hero, About, Services, or Contact)
3. Make your changes in the provided forms
4. Click "Save Changes" to update the website

### Styling
The website uses Tailwind CSS for styling. To customize colors or styles:
1. Edit `tailwind.config.js` for theme customization
2. Modify component classes in individual files for specific changes

## Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Environment Variables
For production, you may want to set up environment variables for:
- Admin credentials
- API endpoints (if integrating with a backend)
- Other configuration options

## Security Considerations

- The current authentication uses a simple username/password check
- For production, implement proper backend authentication
- Consider adding session management and token-based authentication
- Implement rate limiting for login attempts
- Use HTTPS in production

## Future Enhancements

- Backend integration with database
- Patient appointment booking system
- Doctor profiles and specializations
- Online payment integration
- Patient portal
- Telemedicine features
- Multi-language support

## Support

For support or questions regarding the JediCare website, please contact the development team.

## License

This project is proprietary to jedicare Medical Centre.
