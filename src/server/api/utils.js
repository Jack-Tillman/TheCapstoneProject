function requireUser(req, res, next) {
  console.log('user is:');
    if (!req.user) {
      res.status(401);
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  }
  
  function requireAdmin(req, res, next) {
    console.log('user is:');
      if (!req.user.isadmin){
        res.status(401);
        next({
          name: "UnauthorizedUserError",
          message: "You must be an administrator to perform this action."
        });
      }
    
      next();
    }
  module.exports = {
    requireUser,
    requireAdmin
  }