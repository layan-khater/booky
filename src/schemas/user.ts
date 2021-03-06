import { Document, model, Schema } from "mongoose";
import { OtpType } from "./otp";

export enum Role {
  member = 0,
  admin = 1,
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  secondFactorKey: string;
  isSecondFactorEnabled: boolean;
  secondFactorMethod: OtpType;
  role: Role;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  secondFactorKey: { type: String },
  secondFactorMethod: {
    type: String,
    enum: Object.values(OtpType),
    default: OtpType.none,
  },
  isSecondFactorEnabled: { type: Boolean },
  role: { type: String, enum: Object.values(Role), default: Role.member },
});

const User = model<IUser>("Users", userSchema);

export default User;
