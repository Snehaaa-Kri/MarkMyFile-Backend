const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Debugging ke liye log

  // Status code agar set nahi hai toh default 500
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler;
