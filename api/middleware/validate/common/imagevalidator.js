const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const validationMiddleware = (value, { req }) => {
  if (!req.files || !req.files?.profile) {
    throw new Error('Please upload a file.');
  }

  if (!imageMimeTypes.includes(req.files.profile.mimetype)) {
    throw new Error('Only image files are allowed.');
  }

  if (req.files.profile.size > 1000000) {
    throw new Error('File size should be less than 1MB.');
  }

  return true;
};

module.exports = validationMiddleware;