# EmailJS Setup Guide for JediCare Medical Centre

This guide will help you set up EmailJS to receive appointment bookings directly to your email (brkkiprip@gmail.com).

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create an Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail is recommended)
4. Connect your Gmail account (brkkiprip@gmail.com)
5. Give your service a name (e.g., "JediCare_gmail")
6. Click **Create Service**

## Step 3: Create Email Templates

### Template 1: Appointment Notification (to clinic)

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. **Template Name**: `Appointment Notification`
4. **Subject**: `New Appointment Request - {{patient_name}}`
5. **Content**:
```
Hello JediCare Team,

You have received a new appointment request:

PATIENT DETAILS:
- Name: {{patient_name}}
- Email: {{patient_email}}
- Phone: {{patient_phone}}

APPOINTMENT DETAILS:
- Date: {{appointment_date}}
- Time: {{appointment_time}}
- Reason: {{appointment_reason}}
- Additional Message: {{additional_message}}

Submitted on: {{submission_date}}

Please contact the patient to confirm this appointment.

Best regards,
JediCare Website System
```

### Template 2: Patient Confirmation

1. Click **Create New Template** again
2. **Template Name**: `Patient Confirmation`
3. **Subject**: `Appointment Request Received - {{clinic_name}}`
4. **Content**:
```
Dear {{patient_name}},

Thank you for choosing {{clinic_name}}! We have received your appointment request:

APPOINTMENT DETAILS:
- Date: {{appointment_date}}
- Time: {{appointment_time}}
- Reason: {{appointment_reason}}

Our team will contact you shortly to confirm your appointment and provide any additional information.

CONTACT INFORMATION:
- Phone: {{clinic_phone}}
- Address: {{clinic_address}}

If this is a medical emergency, please call us immediately.

Best regards,
{{clinic_name}} Team
```

## Step 4: Get Your Credentials

1. Go to **Account** → **API Keys**
2. Copy your **Public Key**
3. Go to **Email Services** → click your service
4. Copy your **Service ID**
5. Go to **Email Templates** → click each template
6. Copy the **Template ID** for both templates

## Step 5: Update Your Code

Open `src/services/emailService.js` and replace the placeholder values:

```javascript
const EMAILJS_PUBLIC_KEY = '1oAUO2BHShS4uxlN1';
const EMAILJS_SERVICE_ID = 'service_eqgqild';
const EMAILJS_TEMPLATE_ID = 'template_zkcc5vi';
```

Also update the confirmation template ID in the `sendConfirmationEmail` function:
```javascript
'YOUR_CONFIRMATION_TEMPLATE_ID_HERE' // Replace with actual template ID
```

## Step 6: Test the System

1. Start your development server
2. Go to the appointment booking page
3. Fill out the form with test data
4. Submit the form
5. Check both:
   - Your clinic email (brkkiprip@gmail.com) for appointment notification
   - The test email address for patient confirmation

## Important Notes

- **Free Plan Limitation**: EmailJS free plan allows 200 emails per month
- **Security**: Your public key is safe to expose in frontend code
- **Custom Domain**: For production, consider upgrading to EmailJS premium for better deliverability
- **Testing**: Always test with real email addresses before going live

## Troubleshooting

### Common Issues:
1. **"Email not sent"**: Check your EmailJS service is connected properly
2. **Template variables not working**: Ensure variable names match exactly ({{variable_name}})
3. **Gmail connection issues**: Make sure to allow less secure apps or use app passwords

### Debug Mode:
EmailJS provides debug mode. Add this to your emailService.js:
```javascript
emailjs.init(EMAILJS_PUBLIC_KEY, { debug: true });
```

## Support

If you need help:
- EmailJS documentation: https://www.emailjs.com/docs/
- JediCare support: Contact your development team

Once set up, you'll receive appointment notifications instantly at brkkiprip@gmail.com!
