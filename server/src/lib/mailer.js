const nodemailer = require("nodemailer");

function sendMail({ from, to, subject, text }) {
    const { MAILER_USER, MAILER_PASS } = process.env;

    const mailOptions = {
        from: from !== undefined ? from : MAILER_USER,
        to,
        subject,
        text,
    };

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
            user: MAILER_USER,
            pass: MAILER_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    return transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("err => ", err);
            return console.log("Error occurs");
        }
        return console.log("Email sent");
    });
}

module.exports = {
    sendMail,
};
