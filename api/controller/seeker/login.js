const loginChecker = require("../../model/ownerModels").loginChecker;
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const utility = await loginChecker(password, email, "seeker");
  if (utility.success) {
    jwt.sign(
      JSON.stringify({
        key: utility.id,
        type: "1",
      }),
      process.env.secret,
      (err, token) => {
        if (err)
          return res
            .status(500)
            .json({ success: false, msg: ["Email or password is wrong."] });

        if (token)
          return res
            .cookie("token", token, {
              httpOnly: true,
              expires: 0,
            })
            .status(200)
            .json({ success: true, msg: ["Success!"], type: 0 });

        return res
          .status(500)
          .json({ success: false, msg: ["Email or password is wrong."] });
      }
    );
  } else
    return res
      .status(421)
      .json({ success: false, msg: ["Email or password is wrong."] });
};
