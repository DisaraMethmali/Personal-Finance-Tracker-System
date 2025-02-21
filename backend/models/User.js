const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, unique: true, sparse: true },
  address: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // role-based access
  isVerified: { type: Boolean, default: false }, // Account verification status
  verificationToken: { type: String }, // Verification token for email verification
  resetPasswordToken: { type: String }, // Token for password reset
  resetPasswordExpires: { type: Date }, // Expiry for reset password token
  accountStatus: { type: String, enum: ["active", "suspended", "deactivated"], default: "active" }, // Account status
  lastLogin: { type: Date, default: Date.now }, // Track last login
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);

