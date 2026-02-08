//In the name of Cross ✞
/**http Example:
 * <form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" => this should be equal in front and back />
</form>
 */
import { uploadInDisk } from "../interface/multer.js";
const fields = [
  { name: "garagedCarImages", maxCount: 3 },
  { name: "fixesImages", maxCount: 6 },
  { name: "carsImages", maxCount: 3 },
  { name: "parts", maxCount: 1 },
];

const uploadMiddleware = uploadInDisk.fields;

export { uploadMiddleware };
