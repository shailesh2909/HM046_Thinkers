// middleware/role.js
const authorize = (requiredType) => {
  return (req, res, next) => {
    // Note: using user_type to match your model
    if (req.user && req.user.user_type === requiredType) {
      next();
    } else {
      res.status(403).json({ message: "Access denied: Unauthorized role" });
    }
  };
};

module.exports = authorize;