import multer from "multer";
import fs from "fs";

const uploadDirectory = "uploads/";
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },

    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});


const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {

        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files allowed"));
        }

    }
});


export default upload;