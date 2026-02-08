import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    const userId = req.user._id;
    const folderName = `uploads/${userId}`;
    // ensure the folder exists
    fs.mkdirSync(folderName, { recursive: true });
    
    cb(null, folderName);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
      "-" +
      uniqueSuffix +
      "." +
      file.originalname.split(".").pop(),
    );

  },

});

export const upload = multer({ storage: storage });
