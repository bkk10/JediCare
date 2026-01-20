import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { 
  Home, 
  FileText, 
  Phone, 
  Settings, 
  LogOut, 
  Save,
  Plus,
  Trash2,
  Edit,
  Star,
  Users,
  User
} from 'lucide-react';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { content, updateContent, updateService, addService, deleteService, addGalleryImage, removeGalleryImage, addTestimonial, updateTestimonial, deleteTestimonial, updateTeamMember, deleteTeamMember, addTeamMember } = useContent();
  const [activeTab, setActiveTab] = useState('hero');
  const [editingService, setEditingService] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [newService, setNewService] = useState({ title: '', subtitle: '', description: '' });

  const handleDeleteTeamMember = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      deleteTeamMember(id);
    }
  };

  const handleAddTestimonial = () => {
    const newTestimonial = {
      name: '',
      age: 30,
      location: 'Kapsoya',
      story: '',
      rating: 5,
      treatment: 'General Consultation'
    };
    addTestimonial(newTestimonial);
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
    }
  };

  const handleAddTeamMember = () => {
    const newMember = {
      name: '',
      title: '',
      specialty: '',
      experience: '',
      bio: ''
    };
    addTeamMember(newMember);
  };

  const handleAddGalleryImage = (image) => {
    addGalleryImage(image);
  };

  const handleRemoveGalleryImage = (index) => {
    removeGalleryImage(index);
  };

  const handleLogout = () => {
    logout();
  };

  const handleSaveHero = () => {
    updateContent('hero', content.hero);
    alert('Hero section updated successfully!');
  };

  const handleSaveAbout = () => {
    updateContent('about', content.about);
    alert('About section updated successfully!');
  };

  const handleSaveContact = () => {
    updateContent('contact', content.contact);
    alert('Contact information updated successfully!');
  };

  const handleSaveService = (id) => {
    const service = content.services.find(s => s.id === id);
    updateService(id, service);
    setEditingService(null);
    alert('Service updated successfully!');
  };

  const handleAddService = () => {
    if (newService.title && newService.subtitle && newService.description) {
      addService(newService);
      setNewService({ title: '', subtitle: '', description: '' });
      alert('Service added successfully!');
    }
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
      alert('Service deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('hero')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'hero' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="h-5 w-5" />
                <span>Hero Section</span>
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'about' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>About Section</span>
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'services' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Services</span>
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'testimonials' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Star className="h-5 w-5" />
                <span>Testimonials</span>
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'team' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Team</span>
              </button>
            <button
                onClick={() => setActiveTab('contact')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'contact' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Phone className="h-5 w-5" />
                <span>Contact Info</span>
              </button>
            </nav>
          </div>
          <div className="absolute bottom-0 w-64 p-6 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Content Management</h1>

            {/* Hero Section */}
            {activeTab === 'hero' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={content.hero.title}
                      onChange={(e) => updateContent('hero', { ...content.hero, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={content.hero.subtitle}
                      onChange={(e) => updateContent('hero', { ...content.hero, subtitle: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={content.hero.description}
                      onChange={(e) => updateContent('hero', { ...content.hero, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  {/* Hero images are now static - removed from admin panel */}
                  <button
                    onClick={handleSaveHero}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* About Section */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">About Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={content.about.title}
                      onChange={(e) => updateContent('about', { ...content.about, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Main Text</label>
                    <textarea
                      value={content.about.mainText}
                      onChange={(e) => updateContent('about', { ...content.about, mainText: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Text</label>
                    <textarea
                      value={content.about.secondaryText}
                      onChange={(e) => updateContent('about', { ...content.about, secondaryText: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  {/* Gallery Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Gallery Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {content.about.galleryImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image} 
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => handleRemoveGalleryImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <ImageUpload
                      currentImage=""
                      onImageChange={handleAddGalleryImage}
                      label="Add Gallery Image"
                      showPreview={false}
                    />
                  </div>
                  
                  <button
                    onClick={handleSaveAbout}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Services Section */}
            {activeTab === 'services' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Services Management</h2>
                
                {/* Add New Service */}
                <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Add New Service</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      placeholder="Service Title"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input
                      type="text"
                      placeholder="Service Subtitle"
                      value={newService.subtitle}
                      onChange={(e) => setNewService({ ...newService, subtitle: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <textarea
                      placeholder="Service Description"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      rows={2}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      onClick={handleAddService}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Service</span>
                    </button>
                  </div>
                </div>

                {/* Existing Services */}
                <div className="space-y-4">
                  {content.services.map((service) => (
                    <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                      {editingService === service.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => updateService(service.id, { title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                          <input
                            type="text"
                            value={service.subtitle}
                            onChange={(e) => updateService(service.id, { subtitle: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                          <textarea
                            value={service.description}
                            onChange={(e) => updateService(service.id, { description: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                          <ImageUpload
                            currentImage={service.image}
                            onImageChange={(image) => updateService(service.id, { image })}
                            label="Service Image"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSaveService(service.id)}
                              className="flex items-center space-x-2 px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                            >
                              <Save className="h-4 w-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingService(null)}
                              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {service.image && (
                            <img 
                              src={service.image} 
                              alt={service.title}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                          )}
                          <h3 className="text-lg font-semibold">{service.title}</h3>
                          <p className="text-primary-600 font-medium">{service.subtitle}</p>
                          <p className="text-gray-600 mt-1">{service.description}</p>
                          <div className="flex space-x-2 mt-3">
                            <button
                              onClick={() => setEditingService(service.id)}
                              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials Section */}
            {activeTab === 'testimonials' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Patient Testimonials</h2>
                  <button
                    onClick={handleAddTestimonial}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Testimonial</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {content.testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingTestimonial(editingTestimonial === testimonial.id ? null : testimonial.id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                            <span>{editingTestimonial === testimonial.id ? 'Cancel' : 'Edit'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                      
                      {editingTestimonial === testimonial.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                              <input
                                type="text"
                                value={testimonial.name}
                                onChange={(e) => updateTestimonial(testimonial.id, { name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                              <input
                                type="text"
                                value={testimonial.location}
                                onChange={(e) => updateTestimonial(testimonial.id, { location: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Story</label>
                            <textarea
                              value={testimonial.story}
                              onChange={(e) => updateTestimonial(testimonial.id, { story: e.target.value })}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                              <input
                                type="text"
                                value={testimonial.treatment}
                                onChange={(e) => updateTestimonial(testimonial.id, { treatment: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                              <input
                                type="number"
                                value={testimonial.age}
                                onChange={(e) => updateTestimonial(testimonial.id, { age: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                              <select
                                value={testimonial.rating}
                                onChange={(e) => updateTestimonial(testimonial.id, { rating: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              >
                                <option value={5}>5 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={2}>2 Stars</option>
                                <option value={1}>1 Star</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingTestimonial(null)}
                              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditingTestimonial(null)}
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-start space-x-4 mb-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-primary-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-2">
                                <span className="text-sm text-gray-500">{testimonial.location} • Age {testimonial.age}</span>
                                <div className="flex space-x-1">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                                {testimonial.treatment}
                              </span>
                            </div>
                          </div>
                          <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                            "{testimonial.story}"
                          </blockquote>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Section */}
            {activeTab === 'team' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Healthcare Team</h2>
                  <button
                    onClick={handleAddTeamMember}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Team Member</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {content.team.map((member) => (
                    <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingTeamMember(editingTeamMember === member.id ? null : member.id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                            <span>{editingTeamMember === member.id ? 'Cancel' : 'Edit'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTeamMember(member.id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                      
                      {editingTeamMember === member.id ? (
                        <div className="space-y-4">
                          <ImageUpload
                            currentImage={member.image}
                            onImageChange={(image) => updateTeamMember(member.id, { image })}
                            label={`${member.name} Photo`}
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) => updateTeamMember(member.id, { name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                              <input
                                type="text"
                                value={member.title}
                                onChange={(e) => updateTeamMember(member.id, { title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                              <input
                                type="text"
                                value={member.specialty}
                                onChange={(e) => updateTeamMember(member.id, { specialty: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                              <input
                                type="text"
                                value={member.experience}
                                onChange={(e) => updateTeamMember(member.id, { experience: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                              value={member.bio}
                              onChange={(e) => updateTeamMember(member.id, { bio: e.target.value })}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingTeamMember(null)}
                              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditingTeamMember(null)}
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-6">
                          {member.image && (
                            <div className="w-32 h-32 flex-shrink-0">
                              <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <span className="text-sm font-medium text-gray-500">Title:</span>
                                <p className="text-gray-900">{member.title}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-500">Specialty:</span>
                                <p className="text-gray-900">{member.specialty}</p>
                              </div>
                            </div>
                            <div className="mb-4">
                              <span className="text-sm font-medium text-gray-500">Experience:</span>
                              <p className="text-gray-900">{member.experience}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">Bio:</span>
                              <p className="text-gray-900">{member.bio}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'contact' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={content.contact.phone}
                      onChange={(e) => updateContent('contact', { ...content.contact, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={content.contact.email}
                      onChange={(e) => updateContent('contact', { ...content.contact, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={content.contact.address}
                      onChange={(e) => updateContent('contact', { ...content.contact, address: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weekday Hours</label>
                    <input
                      type="text"
                      value={content.contact.hours.weekdays}
                      onChange={(e) => updateContent('contact', { 
                        ...content.contact, 
                        hours: { ...content.contact.hours, weekdays: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sunday Hours</label>
                    <input
                      type="text"
                      value={content.contact.hours.sunday}
                      onChange={(e) => updateContent('contact', { 
                        ...content.contact, 
                        hours: { ...content.contact.hours, sunday: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Hotline</label>
                    <input
                      type="text"
                      value={content.contact.emergencyHotline}
                      onChange={(e) => updateContent('contact', { 
                        ...content.contact, 
                        emergencyHotline: e.target.value 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <ImageUpload
                    currentImage={content.contact.mapImage}
                    onImageChange={(image) => updateContent('contact', { ...content.contact, mapImage: image })}
                    label="Map Image"
                  />
                  <button
                    onClick={handleSaveContact}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
