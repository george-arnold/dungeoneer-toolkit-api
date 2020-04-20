const verifyJwt = (token) => {
  return jwt.verify(token, config.JWT_SECRET, {
    algorithms: ["HS256"],
  });
};
const getUserWithUserName = (db, user_name) => {
  return db("blogful_users").where({ user_name }).first();
};
const requireAuth = (req, res, next) => {
  const authToken = req.get("Authorization") || "";

  let bearerToken;
  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

  try {
    const payload = verifyJwt(bearerToken);

    getUserWithUserName(req.app.get("db"), payload.sub)
      .then((user) => {
        if (!user)
          return res.status(401).json({ error: "Unauthorized request" });
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized request" });
  }
};
module.exports = {
  requireAuth,
};
