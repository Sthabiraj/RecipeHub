import { model, Schema } from "mongoose";

const userSchema = new Schema(
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
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
