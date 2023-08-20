const logout = (req, res) => {
  res.clearCookie('token',path: '/');
  res.status(200).json({ success: true });
};

module.exports = logout;
