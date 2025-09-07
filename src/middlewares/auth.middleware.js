import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Validate JWT and attach user to req.user
export const validateJWT = async (req, res, next) => {
  try {
    // Token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');


    // console.log("Token in middleware: ", token);
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized: No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and attach to req
    const user = await User.findById(decoded?._id).select(
      '-password -refreshToken'
    );
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized: User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized: Invalid or expired token'
    });
  }
};

// Generic Role Authorization
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Unauthorized: No user found in request'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied: Requires role(s) ${allowedRoles.join(', ')}`
      });
    }

    next();
  };
};



//HOW TO USE? 

// router.post(
//   '/create-assignment',
//   validateJWT,
//   authorizeRoles('faculty'),
//   createAssignment
// );

// router.delete(
//   '/delete-lab/:id',
//   validateJWT,
//   authorizeRoles('faculty', 'admin'),
//   deleteLab
// );
