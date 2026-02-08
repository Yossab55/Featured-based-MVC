//In the Name of Cross ✞
import { baseError } from "../../error/base.error.js";
import { BAD_REQUEST } from "../../utils/constants/ResponseCode.js";

function mongoCreateError(error, endpoint, stack) {
  const errors = [];
  for (const errName in error.errors) {
    errors.push(
      baseError(
        "Validation Error from APP",
        BAD_REQUEST,
        `Validator: ${error.errors[errName].kind} on field: ${error.errors[errName].path}, got Invalid Value: ${error.errors[errName].value}`,
        error.errors[errName].value,
        endpoint,
        "Please Insert correct Data",
        stack,
      ),
    );
  }

  return errors;
}

export { mongoCreateError };
//In mongoose
/** err.errors['name'] instanceof mongoose.Error.ValidatorError;

// err.errors['name'].kind; // 'required'
// err.errors['name'].path; // 'name'
// err.errors['name'].value; // undefined
========================= Note unique is not a validator!!!
  custom message:
    const breakfastSchema = new Schema({
      eggs: {
        type: Number,
        min: [6, 'Must be at least 6, got {VALUE}'],
        max: 12
      },
      drink: {
        type: String,
        enum: {
          values: ['Coffee', 'Tea'],
          message: '{VALUE} is not supported'
        }
      }
  });
// object:
{
  "message": "User validation failed",
  "errors": {
    "email": {
      "message": "Path `email` is invalid (invalid-email)"
    },
    "age": {
      "message": "Path `age` (15) is less than minimum allowed value (18)"
    }
  }
}

  custom message & validation:
    const userSchema = new Schema({
      phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
});
 */
