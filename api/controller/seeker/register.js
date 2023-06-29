const { insertIntoSeeker } = require("../../model/seekerModels");

module.exports = async (req, res) => {
  let date = new Date();
  resumePath =
    __dirname +
    "\files\resumes\/" +
    date.getTime() +
    req.body.email.replace(/\s+/g, "")+".pdf";

  req.files.resume.mv(resumePath, function (err) {
    if (err)
      return res.status(422).json({
        success: false,
        msg: ["Resume was not provided"],
      });
  });

  const typeExtensionKeyPair = new Map([
    ["image/jpeg", ".jpg"],
    ["image/png", ".png"],
    ["image/gif", ".gif"],
  ]);
  const type = req.files.profile.mimetype;
  profPath =
    __dirname +
    "\files\dps\/" +
    date.getTime() +
    req.body.email.replace(/\s+/g, "") +
    typeExtensionKeyPair.get(type.toString());

  req.files.profile.mv(profPath, function (err) {
    if (err)
      return res.status(422).json({
        success: false,
        msg: ["Profile picture was not provided"],
      });
  });

  const util = await insertIntoSeeker(req.body, profPath, resumePath);
  if (!util) res.status(400).json({ success: false });
  res.status(200).json({ success: true });
};
