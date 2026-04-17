import crypto from "crypto";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
// Generate otp

export const generateOTP = () => {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
}
// Hashing otp
export const hashOTP = (data) => {
    if(!process.env.HASHING_SECRET) {
        throw new Error("HASHING_SECRET is not defined ");
    }
    return crypto.createHmac("sha256", process.env.HASHING_SECRET).update(data).digest("hex");
}

// Verify otp
export const verifyOTP = (data, hashedOTP) => {
    const hashedData = hashOTP(data);
    return hashedData === hashedOTP;
}

// send otp to user

const config = {
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
     }

}

const transporter = nodemailer.createTransport(config);

// const mailGenerator = new Mailgen({
//     theme: "default",
//     product: {
//         name: "Book My Movie",
//         link: "http://localhost:3000",
//         logo:"https://res.cloudinary.com/dj2bohddo/image/upload/v1773676749/bookMyScreen_lqlqtc.png"
//     }
// })

// export const sendOTPtoEmail = async(email, otp) => {
//     const emailTemp = {
//             body: {
//                 name: '',
//                 intro: 'Welcome to bookMyScreen! We\'re very excited to have you on board.',
//                 action: {
//                     instructions: 'To verify your account, please use the following OTP:',
//                     button: {
//                         color: '#323232', // Optional action button color
//                         text: otp,
//                         link: '#'
//                     }
//                 },
//                 outro: 'This OTP will expire in a short time (2 mins) for security reasons. If you did not request this OTP, please ignore this email.'
//             }
//         }; 
//     const mail = mailGenerator.generate(emailTemp);

//     let message = {
//         from: process.env.EMAIL_USERNAME,
//         to: email,
//         subject: "Your OTP for Book My Movie",
//         html: mail
//     }

//     const info = await transporter.sendMail(message);
//     console.log("OTP email sent: ", info);
    
//     return info.messageId;
// }

export const sendOTPtoEmail = async (email, otp) => {
  const html = `
    <div style="font-family: Arial, sans-serif; text-align:center; padding:20px;">
      <h2 style="color:#333;">Book My Movie</h2>
      
      <p style="font-size:16px; color:#555;">
        Use the OTP below to verify your account
      </p>

      <div style="
        display:inline-block;
        margin:20px 0;
        padding:15px 30px;
        font-size:24px;
        font-weight:bold;
        letter-spacing:5px;
        background:#000;
        color:#fff;
        border-radius:8px;
      ">
        ${otp}
      </div>

      <p style="color:#777; font-size:14px;">
        This OTP expires in 2 minutes.
      </p>

      <p style="color:#aaa; font-size:12px;">
        If you didn’t request this, you can safely ignore this email.
      </p>
    </div>
  `;

  const message = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Your OTP for Book My Movie",
    html,
  };

  const info = await transporter.sendMail(message);

  console.log("OTP email sent:", info.messageId);

  return info.messageId;
};