const model = require("../../model/common/logout");

const logout = async (req, res) => {
  res.clearCookie("token");
  try {
    const rs = await model(req.jwtid, req.jwttype);
    if (!rs.success) throw new Error();
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

module.exports = logout;
