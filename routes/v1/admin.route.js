const express = require("express");
const checkLogin = require("../../middleware/checklogin");
const {
  getAdmin,
  saveAdmin,
  deleteAdmin,
  upDateAdmin,
  adminLogin,
} = require("../../controller/admin.controller");

const router = express.Router();

router.route("/").get(checkLogin, getAdmin).post(saveAdmin);
router.route("/:id").delete(deleteAdmin).patch(upDateAdmin);
router.route("/login").post(adminLogin);

module.exports = router;
