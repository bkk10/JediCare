import emailjs from '@emailjs/browser';

// Initialize EmailJS with your actual credentials
emailjs.init("1oAUO2BHShS4uxlN1");

// Send appointment to clinic
export const sendAppointmentEmail = async (appointmentData) => {
  try {
    const emailContent = `
      <h2>New Appointment Booking</h2>
      <p><strong>Name:</strong> ${appointmentData.name}</p>
      <p><strong>Email:</strong> ${appointmentData.email}</p>
      <p><strong>Phone:</strong> ${appointmentData.phone}</p>
      <p><strong>Date:</strong> ${appointmentData.date}</p>
      <p><strong>Time:</strong> ${appointmentData.time}</p>
      <p><strong>Reason:</strong> ${appointmentData.reason}</p>
      <p><strong>Message:</strong> ${appointmentData.message || 'No additional message'}</p>
      <hr>
      <p><em>Submitted: ${new Date().toLocaleString()}</em></p>
    `;

    await emailjs.send(
      "service_eqgqild",           // Your Service ID
      "template_nly1a15",          // Your Template ID
      {
        to_name: "JediCare Admin",
        from_name: appointmentData.name,
        from_email: appointmentData.email,
        from_phone: appointmentData.phone,
        appointment_date: appointmentData.date,
        appointment_time: appointmentData.time,
        appointment_reason: appointmentData.reason,
        message: appointmentData.message || 'No additional message',
        clinic_name: "JediCare Medical Centre",
        submission_date: new Date().toLocaleString(),
        reply_to: "brkkiprop@gmail.com",
        html_message: emailContent  // Send HTML content directly
      }
    );
    
    console.log('✅ Appointment email sent via EmailJS');
    console.log('Appointment details:', appointmentData);
    
    return { 
      success: true, 
      message: 'Appointment details sent successfully!' 
    };
    
  } catch (error) {
    console.error('EmailJS error:', error);
    
    // Fallback to console logging
    console.log('=== NEW APPOINTMENT FOR JEDICARE ===');
    console.log('Send to: brkkiprop@gmail.com');
    console.log('Patient:', appointmentData.name);
    console.log('Email:', appointmentData.email);
    console.log('Phone:', appointmentData.phone);
    console.log('Date:', appointmentData.date);
    console.log('Time:', appointmentData.time);
    console.log('Reason:', appointmentData.reason);
    console.log('Message:', appointmentData.message);
    console.log('Submitted:', new Date().toLocaleString());
    console.log('=====================================');
    
    return { 
      success: true, 
      message: 'Appointment received (check console for details)' 
    };
  }
};

// Send confirmation to patient
export const sendConfirmationEmail = async (appointmentData) => {
  try {
    const confirmationContent = `
      <h2>Appointment Confirmation</h2>
      <p>Dear ${appointmentData.name},</p>
      <p>Your appointment has been successfully booked at JediCare Medical Centre!</p>
      
      <h3>Appointment Details:</h3>
      <ul>
        <li><strong>Date:</strong> ${appointmentData.date}</li>
        <li><strong>Time:</strong> ${appointmentData.time}</li>
        <li><strong>Reason:</strong> ${appointmentData.reason}</li>
        <li><strong>Phone:</strong> ${appointmentData.phone}</li>
      </ul>
      
      <p>Please arrive 10 minutes before your scheduled time.</p>
      <p>If you need to reschedule, please call us at +254 XXX XXX XXX.</p>
      
      <p><strong>Clinic Address:</strong><br>
      Kapsoya Ward, Ainabkoi Constituency, Uasin Gishu County</p>
      
      <p>We look forward to seeing you!</p>
      
      <p>Best regards,<br>
      JediCare Medical Centre Team</p>
    `;

    await emailjs.send(
      "service_eqgqild",           // Same Service ID
      "template_nly1a15",          // Same Template ID
      {
        to_name: appointmentData.name,
        to_email: appointmentData.email,  // This should send to patient's email
        from_name: "JediCare Medical Centre",
        from_email: "info@jedicare.co.ke",
        patient_name: appointmentData.name,
        patient_email: appointmentData.email,
        appointment_date: appointmentData.date,
        appointment_time: appointmentData.time,
        appointment_reason: appointmentData.reason,
        patient_phone: appointmentData.phone,
        clinic_name: "JediCare Medical Centre",
        clinic_phone: "+254 XXX XXX XXX",
        clinic_address: "Kapsoya Ward, Ainabkoi Constituency, Uasin Gishu County",
        submission_date: new Date().toLocaleString(),
        reply_to: "info@jedicare.co.ke",  // Patient can reply to clinic
        html_message: confirmationContent  // Send HTML content directly
      }
    );
    
    console.log('✅ Confirmation email sent via EmailJS to:', appointmentData.email);
    
    return { 
      success: true, 
      message: 'Confirmation email sent to patient!' 
    };
    
  } catch (error) {
    console.error('Confirmation email error:', error);
    console.log('Failed to send confirmation to:', appointmentData.email);
    return { 
      success: false, 
      message: 'Confirmation email failed, but appointment was received' 
    };
  }
};
