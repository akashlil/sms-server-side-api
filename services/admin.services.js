const Admin = require("../model/Admin");

/* 
//you can any bulid in your function use----> makeSchema.methods
// ,makeSchema.statics and makeSchema.querys handle mongoosedb 

 //adminSchema.methods then use it
module.exports.getAdminService = async function () {
 const res = new Admin();
 const ss = await res.findbulding();
 return ss;
};

// //////////////////////

//adminSchema.statics then use it .
module.exports.getAdminService = async function () {
 const res = await Admin.findbulding();
 return res;
};


*/

module.exports.getAdminService = async function () {
  const res = await Admin.find({});
  return res;
};

module.exports.saveAdminServices = async function (data) {
  const res = await Admin.create(data);
  return res;
};

module.exports.upDataAdminService = async function (updataData) {
  const { id, data } = updataData;
  if (!id || !data) {
    return "plz body send data carryfully";
  }
  const res = await Admin.updateOne({ _id: id }, { $set: data });
  return res;
};

module.exports.deleteAdminService = async function (id) {
  const res = await Admin.deleteOne({ _id: id });
  return res;
};

module.exports.AdminLoginService = async function (data) {
  const { email, name } = data;
  const findResult = await Admin.findOne({
    $or: [{ email: email }, { name: name }],
  });
  return findResult;
};
