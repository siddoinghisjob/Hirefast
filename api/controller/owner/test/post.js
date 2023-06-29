const {postTest} = require('../../../model/ownerModels');

const post = async (req, res) => {
  try {
    const query = await postTest(req);
    if (!query.success)
      return res.status(500).json({
        success: false,
        msg: ["We are facing some issues from our end. Kindly try again."],
      });
    res.status(200).json({ success: true });
  } catch (err) {
    return res.status(510).json({
      success: false,
      msg: ["We are facing some issues from our end. Kindly try again."],
    });
  }
};

module.exports = post;
