const authCheck = (req, res, next) => {
  console.log("authentication successfull");
  next();
};

module.exports = { authChecker: authCheck };
