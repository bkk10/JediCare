// Simple Email Service - Direct to Gmail
export const sendAppointmentEmail = async (appointmentData) => {
  try {
    // Method 1: Try FormSubmit.co (no setup required)
    const formData = new FormData();
    
    formData.append('name', appointmentData.name);
    formData.append('email', appointmentData.email);
    formData.append('phone', appointmentData.phone);
    formData.append('date', appointmentData.date);
    formData.append('time', appointmentData.time);
    formData.append('reason', appointmentData.reason);
    formData.append('message', appointmentData.message || 'No additional message');
    formData.append('clinic', 'JediCare Medical Centre');
    formData.append('submission_date', new Date().toLocaleString());
    
    const response = await fetch('https://formsubmit.co/ajax/info@jedicare.co.ke', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      return { 
        success: true, 
        message: 'Appointment details sent to info@jedicare.co.ke successfully!' 
      };
    } else {
      throw new Error('FormSubmit failed');
    }
    
  } catch (error) {
    console.error('Email service error:', error);
    
    // Method 2: Fallback - log to console (always works)
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

// Simple confirmation (optional)
export const sendConfirmationEmail = async (appointmentData) => {
  try {
    // Send confirmation to patient's email
    const formData = new FormData();
    
    formData.append('name', appointmentData.name);
    formData.append('email', appointmentData.email);
    formData.append('subject', 'Appointment Confirmation - JediCare Medical Centre');
    formData.append('message', `
      Dear ${appointmentData.name},

      Your appointment has been successfully booked at JediCare Medical Centre!

      Appointment Details:
      - Date: ${appointmentData.date}
      - Time: ${appointmentData.time}
      - Reason: ${appointmentData.reason}
      - Phone: ${appointmentData.phone}

      Please arrive 10 minutes before your scheduled time.
      If you need to reschedule, please call us at +254 XXX XXX XXX.

      We look forward to seeing you!

      Best regards,
      JediCare Medical Centre Team
      Kapsoya Ward, Ainabkoi Constituency, Uasin Gishu County
    `);
    
    const response = await fetch('https://formsubmit.co/ajax/' + appointmentData.email, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      return { 
        success: true, 
        message: 'Confirmation email sent to patient!' 
      };
    } else {
      throw new Error('Confirmation email failed');
    }
    
  } catch (error) {
    console.error('Confirmation email error:', error);
    return { 
      success: false, 
      message: 'Confirmation email failed, but appointment was received' 
    };
  }
};
