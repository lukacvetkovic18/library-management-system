import fp from "fastify-plugin";
import nodemailer from "nodemailer"
import { config } from "dotenv";

config();

const Mailer = {
    sendMail: async (emailData) => {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        let info = await transporter.sendMail({
            to: emailData.receiver,
            subject: emailData.subject,
            text: emailData.text,
            html: emailData.html,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return { message: "Message sent successfully" };
    }
}

export default fp((fastify, opts, done) => {
    fastify.decorate("mailer", Mailer)
    fastify.decorate("sendMail", Mailer.sendMail)
    done();
})