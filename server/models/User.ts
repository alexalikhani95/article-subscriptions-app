import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true, // If there is space infront or behind the password, trim that away
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  stripeCustomerId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
