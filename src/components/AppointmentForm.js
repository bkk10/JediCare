import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { sendAppointmentEmail, sendConfirmationEmail } from '../services/emailService';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    reason: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState('');

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const appointmentReasons = [
    'General Consultation',
    'Medical Check-up',
    'Specialist Referral',
    'Emergency Care',
    'Follow-up Visit',
    'Vaccination',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Phone validation (simple)
    const phoneRegex = /^[\d\s\-+()]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setEmailError('');
    
    try {
      // Try email service first
      const clinicEmailResult = await sendAppointmentEmail(formData);
      
      if (!clinicEmailResult.success) {
        setEmailError(clinicEmailResult.message);
        setIsSubmitting(false);
        return;
      }
      
      // Send confirmation email to patient
      await sendConfirmationEmail(formData);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 8 seconds (longer for user to see options)
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: '',
          time: '',
          reason: '',
          message: ''
        });
      }, 8000);
      
    } catch (error) {
      console.error('Appointment submission error:', error);
      setEmailError('Failed to submit appointment. Please try again or call us directly.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8 text-center border border-green-200 shadow-lg">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Appointment Booked!</h3>
        <p className="text-green-700 mb-4">
          Thank you for choosing JediCare Medical Centre. We've received your appointment request and will contact you shortly to confirm.
        </p>
        <div className="bg-white rounded-lg p-4 text-left">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Emergency?</strong> If you need immediate medical attention, please call our emergency hotline.
          </p>
          <a href={`tel:+254700000000`} 
             className="text-red-600 font-bold hover:underline flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Call +254 700 000 000
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <User className="h-4 w-4 mr-2 text-primary-600" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-400'
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Phone className="h-4 w-4 mr-2 text-primary-600" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-400'
              }`}
              placeholder="+254 700 000 000"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <Mail className="h-4 w-4 mr-2 text-primary-600" />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-400'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Calendar className="h-4 w-4 mr-2 text-primary-600" />
              Preferred Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-400'
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.date}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Clock className="h-4 w-4 mr-2 text-primary-600" />
              Preferred Time *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.time ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-400'
              }`}
            >
              <option value="">Select a time</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.time && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.time}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <label className="text-sm font-semibold text-gray-700">Reason for Visit *</label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
              errors.reason ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-400'
            }`}
          >
            <option value="">Select reason</option>
            {appointmentReasons.map(reason => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
          {errors.reason && (
            <p className="text-red-500 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.reason}
            </p>
          )}
        </div>

        <div className="space-y-2 mb-6">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <MessageSquare className="h-4 w-4 mr-2 text-primary-600" />
            Additional Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-400 transition-all resize-none"
            placeholder="Please describe your symptoms or any specific concerns..."
          />
        </div>

        {/* Email Error Display */}
        {emailError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Email Service Error</p>
                <p className="text-sm text-red-700">{emailError}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">Emergency Information</p>
              <p className="text-sm text-red-700">
                If this is a medical emergency, please call our emergency hotline immediately instead of booking online.
              </p>
              <a href={`tel:+254700000000`} 
                 className="text-red-600 font-bold hover:underline mt-1 inline-block">
                +254 700 000 000
              </a>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Booking Appointment...</span>
            </div>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Book Appointment</span>
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
