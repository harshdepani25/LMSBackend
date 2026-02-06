const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);


const sendSMS = async (phone_no, OTP) => {
    try {
        client.messages
            .create({
                body: `Youe OTP is : ${OTP}`,
                messagingServiceSid: 'MG3b2a5294453a7a6222bb9444eaaff896',
                to: phone_no
            })
            .then(message => console.log(message.sid));
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = sendSMS;