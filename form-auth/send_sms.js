const accountSid = '';
const authToken = '';
const client = require('twilio');
const twilio = client(accountSid, authToken);

const number = Math.random(111111, 999999);

twilio.messages
    .create({
        body: 'Your OTP is: ' + number,
        from: '+16413324293',
        to: '+917015563082'
    })
    .then(message => console.log(message.sid));