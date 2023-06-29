const {getTest} = require("../../../model/ownerModels");

const get = async (req, res) => {
  try {
    const query = await getTest(req.jwtid);
    if (!query.success)
      return res.status(500).json({
        success: false,
        msg: ["We are facing some issues from our end. Kindly try again."],
      });
    res.status(200).json({ success: true, std : query.std ,spc: [] });
  } catch (err) {
    return res.status(510).json({
      success: false,
      msg: ["We are facing some issues from our end. Kindly try again."],
    });
  }
};

module.exports = get;
