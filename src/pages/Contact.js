import React from 'react';
import { useContent } from '../contexts/ContentContext';

const Contact = () => {
  const { content } = useContent();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with Jedi Medical Centre
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Visit Our Facility
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600">{content.contact.address}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">{content.contact.phone}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">{content.contact.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Hours</h3>
                <p className="text-gray-600">{content.contact.hours.weekdays}</p>
                <p className="text-gray-600">{content.contact.hours.sunday}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-900 mb-2">Emergency Hotline</h3>
                <p className="text-red-600 font-bold text-lg">{content.contact.emergencyHotline}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
