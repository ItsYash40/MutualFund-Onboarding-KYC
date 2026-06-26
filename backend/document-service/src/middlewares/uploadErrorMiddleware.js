const uploadErrorMiddleware = (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File size exceeds 5 MB",
    });
  }

  return res.status(400).json({
    success: false,
    message: err.message,
  });
};

export default uploadErrorMiddleware;
