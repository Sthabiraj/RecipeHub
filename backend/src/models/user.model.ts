import { model, Schema } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  bio: string;
  address: string;
  profileImage: string;
  socialLinks: {
    name: string;
    url: string;
  }[];
  recipes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    bio: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    socialLinks: [
      {
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.virtual("recipes", {
  ref: "Recipe",
  localField: "_id",
  foreignField: "creator",
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const User = model("User", userSchema);

export default User;
