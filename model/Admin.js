const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: [true, "same email not accept"],
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: Number,
    default: 1,
    require: true,
  },
  parmison: {
    type: String,
    require: true,
    default: "_u",
    enum: ["_u", "_a"],
  },
});

/*

 adminSchema.methods = {
  findbulding: function () {
    return mongoose.model("admin").find(); //google document -methods,statics,querys detlis
  },
};

adminSchema.statics = {
  findbulding: function () {
    return this.find(); //google document -methods,statics,querys detlis
  },
}; 
adminSchema.querys = {
  findbulding: function (id) {
    return this.find({_id:id}); //google document -methods,statics,querys detlis
  },
}; 

*/

const Admin = new mongoose.model("admin", adminSchema);

module.exports = Admin;
