# Fix Patient Confirmation Email Issue

## Problem
The confirmation email is not being sent to patients because both appointment and confirmation emails are using the same EmailJS template, which is likely configured to send only to the clinic email.

## Solution Options

### Option 1: Create a Separate EmailJS Template (Recommended)

1. **Create a new EmailJS template for patient confirmations:**
   - Go to your [EmailJS Dashboard](https://dashboard.emailjs.com/)
   - Navigate to Email Templates
   - Click "Create New Template"
   - Set it up with these details:

**Template Settings:**
- **Template Name:** "Patient Appointment Confirmation"
- **To Email:** `{{to_email}}` (this makes it dynamic)
- **Subject:** "Appointment Confirmation - JediCare Medical Centre"
- **Content:** Use this HTML content:

```html
<h2>Appointment Confirmation</h2>
<p>Dear {{to_name}},</p>
<p>Your appointment has been successfully booked at JediCare Medical Centre!</p>

<h3>Appointment Details:</h3>
<ul>
  <li><strong>Date:</strong> {{appointment_date}}</li>
  <li><strong>Time:</strong> {{appointment_time}}</li>
  <li><strong>Reason:</strong> {{appointment_reason}}</li>
  <li><strong>Phone:</strong> {{patient_phone}}</li>
</ul>

<p>Please arrive 10 minutes before your scheduled time.</p>
<p>If you need to reschedule, please call us at +254 XXX XXX XXX.</p>

<p><strong>Clinic Address:</strong><br>
Kapsoya Ward, Ainabkoi Constituency, Uasin Gishu County</p>

<p>We look forward to seeing you!</p>

<p>Best regards,<br>
JediCare Medical Centre Team</p>
```

2. **Get the new Template ID** and update the code:

```javascript
// In src/services/emailService.js
export const sendConfirmationEmail = async (appointmentData) => {
  try {
    // ... (existing code)
    
    await emailjs.send(
      "service_eqgqild",           // Your Service ID
      "YOUR_NEW_TEMPLATE_ID",      // New Template ID for patient confirmations
      {
        to_name: appointmentData.name,
        to_email: appointmentData.email,  // Patient's email
        // ... other parameters
      }
    );
    
    // ... (existing code)
  } catch (error) {
    // ... (existing code)
  }
};
```

### Option 2: Modify Existing Template (Quick Fix)

If you want to use the same template, you need to modify it in EmailJS:

1. Go to your EmailJS Dashboard
2. Edit your existing template (`template_nly1a15`)
3. Change the "To Email" field from a fixed email to `{{to_email}}`
4. Update the template content to handle both clinic notifications and patient confirmations

**Template Content:**
```html
{{#if to_email}}
<!-- Patient Confirmation -->
<h2>Appointment Confirmation</h2>
<p>Dear {{to_name}},</p>
<!-- Patient confirmation content -->
{{else}}
<!-- Clinic Notification -->
<h2>New Appointment Booking</h2>
<p>New appointment from {{from_name}}</p>
<!-- Clinic notification content -->
{{/if}}
```

### Option 3: Use Different Email Service

If EmailJS is too restrictive, consider using:
- **Resend** - More flexible for transactional emails
- **SendGrid** - Professional email service
- **Brevo** - Good for healthcare communications

## Testing the Fix

1. **Update the code** with your new template ID
2. **Test the appointment booking** with a real email address
3. **Check both emails:**
   - Clinic should receive the appointment notification
   - Patient should receive the confirmation email

## Debugging Tips

If patients still don't receive emails:

1. **Check console logs** for any EmailJS errors
2. **Verify the patient email address** is correct
3. **Check spam/junk folders**
4. **Ensure EmailJS template is set to "Active"**
5. **Verify your EmailJS plan** allows sending to external emails

## Current Code Status

The code is correctly set up to:
- Send appointment details to clinic: `brkkiprop@gmail.com`
- Send confirmation to patient: `appointmentData.email`
- Use proper HTML content in both emails
- Handle errors gracefully

The only issue is the EmailJS template configuration.
