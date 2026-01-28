# Email Setup Guide for JediCare

## Current Configuration

The appointment booking system is already configured to send emails using **FormSubmit.co** - a free service that requires no setup.

### How it works:

1. **Primary Email**: `info@JediCare.co.ke` - Receives appointment notifications
2. **Patient Confirmation**: Automatic confirmation sent to patient's email
3. **Fallback**: Console logging if email service fails

### What you need to do:

#### Option 1: Use FormSubmit.co (Recommended - Free & Easy)
1. Go to [FormSubmit.co](https://formsubmit.co/)
2. Enter your email: `info@JediCare.co.ke`
3. Click "Create Form"
4. You'll get a form endpoint - replace the current one in `emailService.js`

#### Option 2: Use Gmail (Alternative)
1. Set up a Gmail account for the clinic
2. Enable "Less secure app access" or use App Passwords
3. Update the email service configuration

#### Option 3: Professional Email Service (Best for production)
- Use services like SendGrid, Mailgun, or AWS SES
- Update the `emailService.js` file accordingly

### Testing the Email System:

1. Open the website
2. Go to the appointment booking section
3. Fill out the form with real details
4. Submit the form
5. Check:
   - Your clinic email (`info@JediCare.co.ke`)
   - Patient's confirmation email
   - Browser console for fallback messages

### Current Email Content:

**To Clinic:**
- Patient name, email, phone
- Appointment date, time, reason
- Additional message (if any)
- Submission timestamp

**To Patient:**
- Appointment confirmation
- All appointment details
- Arrival instructions
- Contact information for rescheduling

### Troubleshooting:

1. **Emails not arriving?**
   - Check spam/junk folders
   - Verify email address is correct
   - Check browser console for errors

2. **FormSubmit.co limitations:**
   - Free tier: 50 submissions/month
   - Upgrade to Pro for unlimited submissions

3. **Alternative if FormSubmit fails:**
   - System automatically logs to console
   - You can manually check browser console for appointments

### Next Steps:

1. Test the current system
2. Set up FormSubmit.co for `info@JediCare.co.ke`
3. Verify both clinic and patient emails work
4. Monitor for any issues

The system is designed to work immediately with minimal setup!
