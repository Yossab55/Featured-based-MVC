//In the name of Cross ✞

// Don't forget the enctype="multipart/form-data" in your form.
import multer from "multer";
import { mainDir, joinPath, getExtensionName } from "../utils/file.util";
import { v4 as uuid4 } from "uuid";

const disk = multer.diskStorage({
  //the place of downloads
  destination: function (req, file, cb) {
    cb(null, joinPath(mainDir, "source/uploads/"));
  },
  // change the name of the file
  filename: function (req, file, cb) {
    const veryBigNumber = 1e9;
    const randomNumber = math.round(math.random() * veryBigNumber);
    const extensionName = getExtensionName(file.originalname);
    const uniqueFilename = `${uuid4()}-${randomNumber}${extensionName}`;
    cb(null, uniqueFilename);
  },
});

const uploadInDisk = multer({ storage: disk });

export { uploadInDisk };
