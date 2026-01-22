import React from 'react';
import { useContent } from '../contexts/ContentContext';
import {
  Stethoscope,
  Microscope,
  Shield,
  Eye,
  Users,
  MapPin,
  Phone,
  Clock,
  Heart,
  Calendar,
  MessageSquare
} from 'lucide-react';
import TestimonialCard from '../components/TestimonialCard';
import TeamCard from '../components/TeamCard';
import AppointmentForm from '../components/AppointmentForm';

const Home = () => {
  const { content } = useContent();

  const iconMap = {
    'Doctor Consultation': Stethoscope,
    'Medical Diagnostics': Microscope,
    'Medical Treatment': Shield,
    'Preventive Care': Heart,
    'Eye Examination': Eye,
    'Community Healthcare': Users
  };

  const services = content.services.map(service => ({
    ...service,
    icon: iconMap[service.title] || Heart
  }));

  return (
    <div className="min-h-screen bg-white">
{/* ================= HERO ================= */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
{/* Background */}
<div className="absolute inset-0">

  {/* Background image — CLEAR */}
  {content.hero.backgroundImage && (
    <img
      src={content.hero.backgroundImage}
      alt="JediCare Medical Centre"
      className="absolute inset-0 w-full h-full object-cover opacity-60"
    />
  )}

  {/* Minimal overlay (just enough for text) */}
  <div className="absolute inset-0 bg-black/10 dark:bg-black/25" />

</div>


 

  {/* Content */}
  <div className="relative z-10 max-w-5xl mx-auto px-6">
    <div className="bg-white/75 dark:bg-gray-900/75 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-10 md:p-14 shadow-2xl text-center">

      {/* Logo */}
      {content.hero.logo && (
        <img
          src={content.hero.logo}
          alt="JediCare Logo"
          className="h-24 w-24 mx-auto mb-6 rounded-2xl bg-white p-2 shadow-lg"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
        {content.hero.title}
      </h1>

      {/* Subtitle */}
      <p className="text-2xl md:text-4xl font-light text-primary-600 dark:text-primary-400 mb-6">
        {content.hero.subtitle}
      </p>

      {/* Message */}
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
        {content.hero.welcomeMessage}
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#appointment"
          className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
        >
          <span className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Book Appointment
          </span>
        </a>

        <a
          href="#contact"
          className="px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-full font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <span className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Call Us Now
          </span>
        </a>
      </div>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
    <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
      <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-bounce" />
    </div>
  </div>
</section>


      {/* ================= LOCATION ================= */}
      <section className="py-8 bg-secondary-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 justify-center text-center">
          <div className="flex items-center gap-2 justify-center">
            <MapPin className="h-5 w-5 text-secondary-600" />
            <span>Kapsoya Ward, Ainabkoi Constituency</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Clock className="h-5 w-5 text-secondary-600" />
            <span>Uasin Gishu County</span>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Healthcare Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive, patient-centered care for every stage of life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition overflow-hidden"
              >
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition"
                  />
                )}

                <div className="p-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-6 shadow-lg">
                    {React.createElement(service.icon, {
                      className: 'h-8 w-8 text-white'
                    })}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {service.subtitle}
                  </p>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{content.about.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{content.about.mainText}</p>
            <p className="text-lg text-gray-600">{content.about.secondaryText}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              ['24/7', 'Emergency Care'],
              ['6+', 'Medical Services'],
              ['1000+', 'Patients Served'],
              ['5★', 'Patient Rating']
            ].map(([value, label], i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition text-center"
              >
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {value}
                </div>
                <div className="text-gray-600 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EMERGENCY ================= */}
      <section className="bg-red-600 text-white py-3 text-center font-semibold">
        <Phone className="inline h-5 w-5 mr-2" />
        Emergency Hotline:{' '}
        <a href={`tel:${content.contact.emergencyHotline}`} className="underline">
          {content.contact.emergencyHotline}
        </a>
        <span className="ml-4 text-sm">Available 24/7</span>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">
              Trusted by families across our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.testimonials.length > 0 ? (
              content.testimonials.map(t => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))
            ) : (
              <div className="col-span-full text-center bg-white rounded-2xl p-10 border border-dashed">
                <MessageSquare className="h-14 w-14 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 italic">
                  Patient stories coming soon…
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Dedicated professionals you can trust
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.team.length > 0 ? (
              content.team.map(m => <TeamCard key={m.id} member={m} />)
            ) : (
              <div className="col-span-full text-center bg-gray-50 rounded-2xl p-10 border border-dashed">
                <Users className="h-14 w-14 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Team profiles coming soon</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= APPOINTMENT ================= */}
      <section id="appointment" className="py-20 bg-primary-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Book an Appointment</h2>
            <p className="text-xl text-gray-600">
              Compassionate care starts here
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">Get in Touch</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['Emergency Hotline', content.contact.phone, Phone],
              ['Working Hours', content.contact.hours.weekdays, Clock],
              ['Location', content.contact.address, MapPin]
            ].map(([title, value, Icon], i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-lg"
              >
                <Icon className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-primary-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="text-center">
          <Heart className="h-6 w-6 mx-auto text-primary-400 mb-2" />
          <p className="font-semibold">JediCare Medical Centre</p>
          <p className="text-gray-400 text-sm mt-2">
            Compassion • Community • Quality Care
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2026 Jedi Medical Centre
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
