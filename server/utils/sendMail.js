import { createTransport } from "nodemailer";
const mailSender = async (to, subject, text) => {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });
  const mail = await transport.sendMail({
    to,
    subject,
    text,
    from: process.env.SMTP_EMAIL,
  });
  return mail ? true : false;
};

export default mailSender;
