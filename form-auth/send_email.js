const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "sahilgoel.gaming@gmail.com",
        pass: "",
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'sahilgoel.gaming@gmail.com', // sender address
        to: "sahilgoel755@gmail.com", // list of receivers
        subject: "Hello From Sahil", // Subject line
        html: "Hi! <b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
