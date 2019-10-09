module.exports = function ensureRole(role) {
  return ({ user }, res, next) => {

    if(!(user.roles.includes(role))) {
      next({
        statusCode: 401,
        error: 'Need admin access'
      });
    }
    else {
      next();
    }
  };
};