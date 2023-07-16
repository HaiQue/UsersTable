const User = require("../models/user.model.js");

const queryHandler = async (req, res, next) => {
  if (Object.keys(req.query).length) {
    const data = await User.find(req.query);
    res.json(data);
  } else {
    next();
  }
};

module.exports = { queryHandler };
