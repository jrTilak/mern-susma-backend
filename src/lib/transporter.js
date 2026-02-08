import nodemailer from "nodemailer";
import "dotenv/config";

//  to get app password
/**
 * Goto gmail
 * select your account
 * click manage your google account
 * imp: turn on 2 step verification
 * Generate app password
 */

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "079bct094@ioepc.edu.np",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});
