import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";

enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

interface UserDocument extends Document {
  email: string;
  password: string;
  avatar?: string;
  emailVerified: boolean;
  name: string;
  role: UserRole;
  roleVerified: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  emailVerified: { type: Boolean, default: false },
  provider: { type: String },
  googleId: { type: String },
  address: { type: String },
  name: { type: String, required: true, unique: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
});

userSchema.pre<UserDocument>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
