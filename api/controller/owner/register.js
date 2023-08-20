const { insertIntoOwner } = require("../../model/ownerModels");

module.exports = async (req, res) => {
  let date = new Date();
  const typeExtensionKeyPair = new Map([
    ["image/jpeg", ".jpg"],
    ["image/png", ".png"],
    ["image/gif", ".gif"],
  ]);
  const type = req.files.profile.mimetype;
  logoPath =
    __dirname +
    "/files/logos/" +
    date.getTime() +
    req.body.email.replace(/\s+/g, "") +
    typeExtensionKeyPair.get(type.toString());

  req.files.profile.mv(logoPath, function (err) {
    if (err)
      res.status(400).json({
        success: false,
        msg: ["Logo was not provided"],
      });
  });
  const util = await insertIntoOwner(req.body, logoPath);
  if (!util) res.status(400).json({ success: false, message: "Yesh" });
  res.status(200).json({ success: true });
};
