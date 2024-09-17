import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
    isPrivate: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
