const AWS = require('aws-sdk');
const ses = new AWS.SES({region: 'ap-south-1'});

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const {name, email, phone, message} = event.arguments;
  console.log('Form Data:', {name, email, phone, message});

  const emailBody = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message: ${message}
  `;
  console.log('Email Body:', emailBody);

  // Use the email passed from the frontend for the recipient
  const params = {
    Source: 'hamza2.idenbrid@gmail.com', // Your verified sender email
    Destination: {
      ToAddresses: [email] // Dynamic recipient from the frontend
    },
    Message: {
      Subject: {Data: `Contact Form Submission: ${name}`},
      Body: {Text: {Data: emailBody}}
    }
  };

  try {
    console.log('Sending email with params:', params);
    const myresponse = await ses.sendEmail(params).promise();
    console.log('Email sent successfully:', myresponse);
    return {
      message: 'Email sent successfully!',
      success: true
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      message: error.message,
      success: false
    };
  }
};
