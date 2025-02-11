const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    mobileNumber: { 
        type: String, 
        required: true,
        unique: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
