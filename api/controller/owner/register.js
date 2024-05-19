const { insertIntoOwner } = require("../../model/ownerModels");
const path = require("path");

module.exports = async (req, res) => {
  try {
    let date = new Date();
    let timestamp = date.getTime();
    let sanitizedEmail = req.body.email.replace(/\s+/g, "");
    
    const typeExtensionKeyPair = new Map([
      ["image/jpeg", ".jpg"],
      ["image/png", ".png"],
      ["image/gif", ".gif"],
    ]);
    const type = req.files.profile.mimetype;
    let logoFileName = `${timestamp}${sanitizedEmail}${typeExtensionKeyPair.get(type.toString())}`;
    let logoPath = path.join(__dirname, "../../public/files/logos", logoFileName);

    await req.files.profile.mv(logoPath);
    
    let logoUrl = `/files/logos/${logoFileName}`;
    const util = await insertIntoOwner(req.body, logoUrl);
    
    if (!util) {
      return res.status(400).json({ success: false, message: "Yesh" });
    }
    
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: [err.message || "An error occurred while processing the files"],
    });
  }
};
