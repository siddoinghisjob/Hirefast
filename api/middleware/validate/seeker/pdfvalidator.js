const MimeType = ['application/pdf'];

const validationMiddleware = (value, { req }) => {
  if (!req.files || !req.files?.resume) {
    throw new Error('Please upload your resume.');
  }

  if (!MimeType.includes(req.files?.resume.mimetype)) {
    throw new Error('Only pdf files are allowed.');
  }

  if (req.files?.resume.size > 3000000) {
    throw new Error('File size should be less than 3MB.');
  }

  return true;
};

module.exports = validationMiddleware;