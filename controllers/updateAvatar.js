const path = require("path");
const avatarsDir = path.join(__dirname, "../public/avatars");
const fs = require("fs/promises");
const { User } = require("../models/user");
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  try {
    await Jimp.read(tempUpload).then((item) => {
      return item.autocrop().cover(250, 250).write(tempUpload);
    });
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateAvatar;
