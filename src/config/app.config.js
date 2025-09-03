// src/config/app.config.js
export default {
  appName: 'MarkMyFile',
  version: '1.0.0',
  apiPrefix: '/api',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpire: '7d',
  pagination: {
    limit: 10
  }
};
