const ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/auth/login');
};

const ensureAdmin = (req, res, next) => {
    // Basic admin check - in a real app this would check a role field
    // For now we assume if they are logged in they can access, or you can add a specific user check
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
}

module.exports = { ensureAuthenticated, ensureAdmin };
