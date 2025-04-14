const User = require('../models/User');

const authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const checkedUser = await User.findById(req.user.id);
      console.log(checkedUser)

      if (!checkedUser || !allowedRoles.includes(checkedUser.role)) {
        return res.status(403).json({ message: 'Forbidden: insufficient rights' });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error during authorization' });
    }
  };
};

module.exports = { authorize };
