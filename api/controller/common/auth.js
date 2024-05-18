const getDataById = require("../../model/ownerModels").getDataById.ac_info;

const auth = async (req, res) => {
  const results = await getDataById(req.jwtid, req.jwttype);

  if (!results.success || results.loggedin == 0)
    return res
      .status(401)
      .json({ success: false, msg: ["Invalid credentials."] });
  const data = {
    success: true,
    type: req.jwttype,
    id: results.id,
    name: results.name,
    email: results.email,
    resume: results?.resume,
    dp: parseInt(req.jwttype) === 0 ? results.logo : results.dp,
    info: parseInt(req.jwttype) === 0 ? results.brand_info : results.bio,
  };
  res.status(200).json(data);
};

module.exports = auth;
