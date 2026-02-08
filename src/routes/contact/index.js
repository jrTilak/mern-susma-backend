import { Router } from "express";
import { transporter } from "../../lib/transporter.js";

export const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  // name, subject, message
  const data = req.body;

  await transporter.sendMail({
    to: "cpranishabc163@gmail.com",
    from: '"Tilak Thapa" <079bct094@ioepc.edu.np>',
    subject: data.subject,
    text: `Name: ${data.name}
Message: ${data.message}`,
  });

  return res.status(200).json({
    message: "Thank you for contacting",
  });
});
