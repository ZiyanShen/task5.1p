const {logEvents} = require("../middleware/logEvents");
const nodemailer = require("nodemailer");

async function sendEmail(data) {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    let mailOptions = {
        from: `"DEV@Deakin" <${process.env.EMAIL_USER}>`,
        to: data.to,
        subject: data.subject,
        html: data.content
    };
    //发送邮件
    try {
        const res = await transporter.sendMail(mailOptions);
        logEvents(`Succeed ID:${res.messageId}`, 'reqLog.txt')
        return {
            SucceedID: res.messageId
        }
    } catch (e) {
        console.log(e)
    }
}

const email = async (req, res) => {
    const result = await sendEmail({
        to: req.body?.to,
        subject: req.body?.subject,
        content: req.body?.content
    })
    res.status(200).json(result)
}

module.exports = {
    email
}