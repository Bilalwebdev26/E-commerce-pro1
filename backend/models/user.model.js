import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [6, "Password must be 6 character long"],
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const saltRounds = await bcrypt.genSalt(10);
  console.log("SaltRounds : ", saltRounds);
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); //return true/false
};

const User = mongoose.model("User", userSchema);
export default User