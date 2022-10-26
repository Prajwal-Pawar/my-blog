// middleware for storing flash notifications in sessions
module.exports.setFlash = (req, res, next) => {
  // setting flash on locals
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error'),
  };

  next();
};
