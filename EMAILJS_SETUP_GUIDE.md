# EmailJS Setup Guide for JediCare

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" 
3. Use your email: `brkkiprop@gmail.com`
4. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, click "Add New Service"
2. Choose "Gmail" (or any email service)
3. Connect your Gmail account
4. **Copy the Service ID** - looks like `service_xxxxxx`

### Step 3: Create Email Templates

#### Template 1: Appointment Notification (to clinic)
1. Click "Add New Template"
2. Template Name: `Appointment Notification`
3. Subject: `New Appointment - JediCare Medical Centre`
4. Content:
```html
<h2>New Appointment Booking</h2>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{from_phone}}</p>
<p><strong>Date:</strong> {{appointment_date}}</p>
<p><strong>Time:</strong> {{appointment_time}}</p>
<p><strong>Reason:</strong> {{appointment_reason}}</p>
<p><strong>Message:</strong> {{message}}</p>
<hr>
<p><em>Submitted: {{submission_date}}</em></p>
```
5. **Copy the Template ID** - looks like `template_xxxxxx`

#### Template 2: Confirmation (to patient)
1. Click "Add New Template" 
2. Template Name: `Appointment Confirmation`
3. Subject: `Appointment Confirmation - JediCare Medical Centre`
4. Content:
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
<p>If you need to reschedule, please call us at {{clinic_phone}}.</p>

<p><strong>Clinic Address:</strong><br>
{{clinic_address}}</p>

<p>We look forward to seeing you!</p>

<p>Best regards,<br>
JediCare Medical Centre Team</p>
```
6. **Copy this Template ID** - looks like `template_xxxxxx`

### Step 4: Get Public Key
1. In EmailJS dashboard, go to "Account" → "API Keys"
2. **Copy the Public Key** - looks like `xxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 5: Update Code

Replace the placeholder values in `src/services/emailService.js`:

```javascript
// Line 4: Replace YOUR_PUBLIC_KEY
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY");

// Line 9-10: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
const response = await emailjs.send(
  "YOUR_ACTUAL_SERVICE_ID",      // Paste Service ID here
  "YOUR_ACTUAL_TEMPLATE_ID",       // Paste Template ID here
  {
    // ... rest of the code
  }
);

// Line 61-62: Same for confirmation email
const response = await emailjs.send(
  "YOUR_ACTUAL_SERVICE_ID",      // Same Service ID
  "YOUR_ACTUAL_TEMPLATE_ID_2",    // Confirmation Template ID
  {
    // ... rest of the code
  }
);
```

### Step 6: Test It!

1. Start your app: `npm start`
2. Go to appointment booking
3. Fill out the form
4. Submit the form
5. Check:
   - Your Gmail (`brkkiprop@gmail.com`) for appointment notification
   - Patient's email for confirmation
   - Browser console for success messages

## 📋 What You'll Get:

✅ **Reliable email delivery** - Much better than FormSubmit
✅ **100 free emails/month** - Plenty for your clinic
✅ **Professional templates** - Beautiful HTML emails
✅ **No backend required** - Works entirely from frontend
✅ **Instant setup** - Works immediately after configuration

## 🔧 Troubleshooting:

**Emails not sending?**
1. Check all IDs are copied correctly (no extra spaces)
2. Verify EmailJS service is connected to Gmail
3. Check browser console for error messages
4. Make sure you're using the correct template IDs

**Going to spam?**
1. Check spam/junk folders
2. Add clinic email to contacts
3. Use professional email templates (provided above)

## 🎯 You're Ready!

Once you complete these 6 steps, your appointment system will send professional emails reliably. The system will automatically:
- Send appointment details to your Gmail
- Send confirmation to patients  
- Log everything to console as backup
- Handle errors gracefully

**This is much more reliable than FormSubmit.co!** 🚀
