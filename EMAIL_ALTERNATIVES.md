# Email Service Alternatives for JediCare

## Why FormSubmit.co Might Not Work

1. **Free tier limitations** - Only 50 submissions/month
2. **Email delivery delays** - Can be slow or unreliable
3. **Spam filtering** - Emails might go to spam/junk
4. **Service downtime** - Free services can be unreliable

## Better Alternatives

### Option 1: Gmail (Free & Reliable)
```javascript
// In emailService.js
export const sendAppointmentEmail = async (appointmentData) => {
  try {
    // Direct Gmail API setup
    const response = await fetch('https://your-gmail-endpoint.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_GMAIL_API_KEY'
      },
      body: JSON.stringify({
        to: 'brkkiprop@gmail.com',
        subject: 'New Appointment - JediCare Medical Centre',
        html: `
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
        `
      })
    });
    
    return { success: true, message: 'Email sent via Gmail' };
  } catch (error) {
    console.error('Gmail error:', error);
    return { success: false, message: 'Failed to send email' };
  }
};
```

**Setup:**
1. Create Google Cloud account
2. Enable Gmail API
3. Create API key
4. Update the endpoint and API key

### Option 2: SendGrid (Professional - Free tier available)
```javascript
export const sendAppointmentEmail = async (appointmentData) => {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_SENDGRID_API_KEY'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: 'brkkiprop@gmail.com' }],
          subject: 'New Appointment - JediCare Medical Centre',
          dynamic_template_data: {
            patient_name: appointmentData.name,
            patient_email: appointmentData.email,
            patient_phone: appointmentData.phone,
            appointment_date: appointmentData.date,
            appointment_time: appointmentData.time,
            appointment_reason: appointmentData.reason,
            patient_message: appointmentData.message
          }
        }],
        from: { email: 'noreply@jedicare.co.ke', name: 'JediCare Medical Centre' },
        content: [{
          type: 'text/html',
          value: 'Appointment confirmation template'
        }]
      })
    });
    
    return { success: true, message: 'Email sent via SendGrid' };
  } catch (error) {
    console.error('SendGrid error:', error);
    return { success: false, message: 'Failed to send email' };
  }
};
```

**Setup:**
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Get API key (free 100 emails/day)
3. Update API key in code

### Option 3: EmailJS (Easiest - No backend needed)
```javascript
// In emailService.js
import emailjs from '@emailjs/browser';

emailjs.init("YOUR_PUBLIC_KEY");

export const sendAppointmentEmail = async (appointmentData) => {
  try {
    const response = await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      {
        to_name: "JediCare Admin",
        from_name: appointmentData.name,
        from_email: appointmentData.email,
        from_phone: appointmentData.phone,
        appointment_date: appointmentData.date,
        appointment_time: appointmentData.time,
        appointment_reason: appointmentData.reason,
        message: appointmentData.message,
        reply_to: "brkkiprop@gmail.com"
      }
    );
    
    return { success: true, message: 'Email sent via EmailJS' };
  } catch (error) {
    console.error('EmailJS error:', error);
    return { success: false, message: 'Failed to send email' };
  }
};
```

**Setup:**
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create email template
3. Get Service ID, Template ID, and Public Key
4. Install EmailJS: `npm install @emailjs/browser`
5. Update configuration

### Option 4: Resend (Modern & Simple)
```javascript
export const sendAppointmentEmail = async (appointmentData) => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_RESEND_API_KEY'
      },
      body: JSON.stringify({
        from: 'JediCare <noreply@jedicare.co.ke>',
        to: ['brkkiprop@gmail.com'],
        subject: 'New Appointment - JediCare Medical Centre',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Appointment Booking</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${appointmentData.name}</p>
              <p><strong>Email:</strong> ${appointmentData.email}</p>
              <p><strong>Phone:</strong> ${appointmentData.phone}</p>
              <p><strong>Date:</strong> ${appointmentData.date}</p>
              <p><strong>Time:</strong> ${appointmentData.time}</p>
              <p><strong>Reason:</strong> ${appointmentData.reason}</p>
              <p><strong>Message:</strong> ${appointmentData.message || 'No additional message'}</p>
            </div>
            <hr style="margin: 20px 0;">
            <p style="color: #6c757d; font-size: 12px;">
              Submitted: ${new Date().toLocaleString()}
            </p>
          </div>
        `
      })
    });
    
    return { success: true, message: 'Email sent via Resend' };
  } catch (error) {
    console.error('Resend error:', error);
    return { success: false, message: 'Failed to send email' };
  }
};
```

**Setup:**
1. Sign up at [Resend](https://resend.com/)
2. Get API key (free 3,000 emails/month)
3. Update API key in code

## Quick Fix - Test Current FormSubmit

1. **Check spam folder** in `brkkiprop@gmail.com`
2. **Verify FormSubmit endpoint** is correct
3. **Check FormSubmit dashboard** for submission logs
4. **Test with different email** to see if it's email-specific

## Recommended Solution

**Use EmailJS** - It's:
- ✅ Free (100 emails/month)
- ✅ No backend setup required
- ✅ Works immediately
- ✅ Reliable delivery
- ✅ Easy to implement

Would you like me to set up EmailJS for your appointment system?
