const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getAdminService,
  saveAdminServices,
  deleteAdminService,
  upDataAdminService,
  AdminLoginService,
} = require("../services/admin.services");

module.exports.getAdmin = async function (req, res) {
  const result = await getAdminService();
  res.json(result);
};

module.exports.saveAdmin = async function (req, res) {
  try {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    const { name, email } = req.body;
    const data = {
      name,
      email,
      password: hashedpassword,
    };
    const result = await saveAdminServices(data);
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.upDateAdmin = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updataData = {
      id,
      data,
    };
    const result = await upDataAdminService(updataData);
    if (result.modifiedCount) {
      return res.status(200).json({
        status: "200",
        massage: "Data has been updated",
      });
    } else {
      return res.status(400).json({
        massage: "Data has been no updated",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteAdmin = async function (req, res) {
  try {
    const { id } = req.params;
    const result = await deleteAdminService(id);
    if (result.deletedCount) {
      return res.status(200).json({
        status: 200,
        massages: "admin has successfully deleted",
      });
    } else {
      return res.status(400).json({
        Status: 400,
        massages: "admin has not deleted",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.adminLogin = async function (req, res, next) {
  try {
    const admin = await AdminLoginService(req.body);
    if (admin && admin._id) {
      const isvalidPassword = await bcrypt.compare(
        req.body.password,
        admin.password
      );
      if (isvalidPassword) {
        const token = jwt.sign(
          {
            usename: admin.name,
          },
          process.env.JWT_SECRET,
          { expiresIn: "8h" }
        );
        res
          .status(200)
          .cookie("access_token", "Bearer " + token, {
            expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
          })
          .json({
            accessToken: token,
            massage: "Login Successfully",
          });
      } else {
        res.status(500).json({
          massage: "Authorization falid",
        });
      }
    } else {
      res.status(500).json({
        massage: "Authorization falid",
      });
    }
  } catch (error) {
    next(error);
  }
};
