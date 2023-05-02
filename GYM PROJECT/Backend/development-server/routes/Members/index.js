const express = require("express");
const router = express.Router();
const { Auth } = require("../../repository/Authentication");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "../frontend/public/Uploads/",
  filename: (req, file, cb) => {
    return cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });
const {
  add_member,
  edit_member,
  getMembersEdit,
  getMembers,
} = require("../../controller/Members-Controller");

router.post("/add_member", upload.single("file"), add_member);

router.get("/get_members", Auth, getMembers);

router.get("/get_members_for_edit/:uuid", Auth, getMembersEdit);

router.put("/edit_member", upload.single("file"), Auth, edit_member);

module.exports = router;
