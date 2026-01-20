// Simple Email Service - Using mailto links and other easy methods

// Method 1: Direct mailto link (opens email client)
export const sendViaMailto = (appointmentData) => {
  const subject = encodeURIComponent('New Appointment Request - JediCare Medical Centre');
  const body = encodeURIComponent(
`New Appointment Request

PATIENT DETAILS:
Name: ${appointmentData.name}
Email: ${appointmentData.email}
Phone: ${appointmentData.phone}

APPOINTMENT DETAILS:
Date: ${appointmentData.date}
Time: ${appointmentData.time}
Reason: ${appointmentData.reason}
Additional Message: ${appointmentData.message || 'No additional message'}

Submitted on: ${new Date().toLocaleString()}

Please contact the patient to confirm this appointment.

---
JediCare Medical Centre
Kapsoya Ward, Ainabkoi Constituency
Uasin Gishu County`
  );

  const mailtoUrl = `mailto:brkkiprip@gmail.com?subject=${subject}&body=${body}`;
  
  // Open email client
  window.open(mailtoUrl, '_blank');
  
  return { 
    success: true, 
    message: 'Email client opened - please send the email to complete appointment booking' 
  };
};

// Method 2: WhatsApp (if patient prefers WhatsApp)
export const sendViaWhatsApp = (appointmentData) => {
  const message = encodeURIComponent(
`New Appointment Request - JediCare Medical Centre

Patient: ${appointmentData.name}
Email: ${appointmentData.email}
Phone: ${appointmentData.phone}
Date: ${appointmentData.date}
Time: ${appointmentData.time}
Reason: ${appointmentData.reason}
Message: ${appointmentData.message || 'No additional message'}

Please confirm this appointment.`
  );

  const whatsappUrl = `https://wa.me/254700000000?text=${message}`;
  window.open(whatsappUrl, '_blank');
  
  return { 
    success: true, 
    message: 'WhatsApp opened - send message to confirm appointment' 
  };
};

// Method 3: SMS (using tel: link)
export const sendViaSMS = (appointmentData) => {
  const message = encodeURIComponent(
`New Appointment: ${appointmentData.name}, ${appointmentData.date} ${appointmentData.time}, ${appointmentData.reason}. Contact: ${appointmentData.phone}`
  );

  const smsUrl = `sms:+254700000000?body=${message}`;
  window.open(smsUrl);
  
  return { 
    success: true, 
    message: 'SMS app opened - send message to book appointment' 
  };
};

// Method 4: Copy to clipboard (manual email)
export const copyToClipboard = async (appointmentData) => {
  const emailContent = 
`New Appointment Request - JediCare Medical Centre

PATIENT DETAILS:
Name: ${appointmentData.name}
Email: ${appointmentData.email}
Phone: ${appointmentData.phone}

APPOINTMENT DETAILS:
Date: ${appointmentData.date}
Time: ${appointmentData.time}
Reason: ${appointmentData.reason}
Additional Message: ${appointmentData.message || 'No additional message'}

Submitted on: ${new Date().toLocaleString()}

ACTION REQUIRED:
1. Contact patient to confirm appointment
2. Update appointment calendar
3. Send confirmation to patient

---
JediCare Medical Centre
Email: brkkiprip@gmail.com
Phone: +254 700 000 000
Address: Kapsoya Ward, Ainabkoi Constituency, Uasin Gishu County`;

  try {
    await navigator.clipboard.writeText(emailContent);
    return { 
      success: true, 
      message: 'Appointment details copied to clipboard! Paste in your email and send to brkkiprip@gmail.com' 
    };
  } catch (error) {
    console.error('Clipboard error:', error);
    return { 
      success: false, 
      message: 'Failed to copy to clipboard' 
    };
  }
};

// Method 5: Download as text file
export const downloadAsFile = (appointmentData) => {
  const content = 
`Appointment Request - JediCare Medical Centre
==========================================

Patient Details:
- Name: ${appointmentData.name}
- Email: ${appointmentData.email}
- Phone: ${appointmentData.phone}

Appointment Details:
- Date: ${appointmentData.date}
- Time: ${appointmentData.time}
- Reason: ${appointmentData.reason}
- Message: ${appointmentData.message || 'No additional message'}

Submission Details:
- Submitted: ${new Date().toLocaleString()}
- Status: Pending Confirmation

Contact Information:
- Clinic: JediCare Medical Centre
- Email: brkkiprip@gmail.com
- Phone: +254 700 000 000
- Address: Kapsoya Ward, Ainabkoi Constituency, Uasin Gishu County

Next Steps:
1. Contact patient to confirm appointment
2. Update appointment calendar
3. Send confirmation to patient
==========================================`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `appointment_${appointmentData.name}_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  return { 
    success: true, 
    message: 'Appointment details downloaded as file! Email it to brkkiprip@gmail.com' 
  };
};

// Method 6: Print appointment
export const printAppointment = (appointmentData) => {
  const printContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Appointment Request - JediCare Medical Centre</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .section { margin: 20px 0; }
        .label { font-weight: bold; }
        .action { background: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Appointment Request</h1>
        <h2>JediCare Medical Centre</h2>
    </div>
    
    <div class="section">
        <h3>Patient Details</h3>
        <p><span class="label">Name:</span> ${appointmentData.name}</p>
        <p><span class="label">Email:</span> ${appointmentData.email}</p>
        <p><span class="label">Phone:</span> ${appointmentData.phone}</p>
    </div>
    
    <div class="section">
        <h3>Appointment Details</h3>
        <p><span class="label">Date:</span> ${appointmentData.date}</p>
        <p><span class="label">Time:</span> ${appointmentData.time}</p>
        <p><span class="label">Reason:</span> ${appointmentData.reason}</p>
        <p><span class="label">Message:</span> ${appointmentData.message || 'No additional message'}</p>
    </div>
    
    <div class="section">
        <p><span class="label">Submitted:</span> ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="action">
        <h3>Action Required</h3>
        <p>1. Contact patient to confirm appointment</p>
        <p>2. Update appointment calendar</p>
        <p>3. Send confirmation to patient</p>
        <p><strong>Email: brkkiprip@gmail.com | Phone: +254 700 000 000</strong></p>
    </div>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
  
  return { 
    success: true, 
    message: 'Print dialog opened - print and process appointment' 
  };
};
