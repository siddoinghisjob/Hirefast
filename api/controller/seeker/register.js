const { insertIntoSeeker } = require("../../model/seekerModels");
const path = require("path");

module.exports = async (req, res) => {
  try {
    let date = new Date();
    let timestamp = date.getTime();
    let sanitizedEmail = req.body.email.replace(/\s+/g, "");
    
    let resumeFileName = `${timestamp}${sanitizedEmail}.pdf`;
    let resumePath = path.join(__dirname, "../../public/files/resumes", resumeFileName);
    
    let typeExtensionKeyPair = new Map([
      ["image/jpeg", ".jpg"],
      ["image/png", ".png"],
      ["image/gif", ".gif"],
    ]);
    let type = req.files.profile.mimetype;
    let profileFileName = `${timestamp}${sanitizedEmail}${typeExtensionKeyPair.get(type.toString())}`;
    let profPath = path.join(__dirname, "../../public/files/dps", profileFileName);
    
    await req.files.resume.mv(resumePath);
    
    await req.files.profile.mv(profPath);
    
    let resumeUrl = `/files/resumes/${resumeFileName}`;
    let profileUrl = `/files/dps/${profileFileName}`;
    const util = await insertIntoSeeker(req.body, profileUrl, resumeUrl);
    
    if (!util) {
      return res.status(400).json({ success: false });
    }
    
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(422).json({
      success: false,
      msg: [err.message || "An error occurred while processing the files"],
    });
  }
};
