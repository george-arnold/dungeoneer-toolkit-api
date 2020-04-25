const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const verifyJwt = (token) => {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: ["HS256"],
  });
};

const getUserWithEmail = (db, email) => {
  return db("users").where({ email }).first();
};

const requireAuth = (req, res, next) => {
  const authToken = req.get("Authorization") || "";
  let bearerToken;
  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

  const payload = verifyJwt(bearerToken);
  getUserWithEmail(req.app.get("db"), payload.sub)
    .then((user) => {
      if (!user) return res.status(401).json({ error: "Unauthorized request" });
      req.user = user;
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

// function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
//   const token = jwt.sign({ email: user.id }, secret, {
//     subject: user.user_name,
//     algorithm: "HS256",
//   });
//   return `Bearer ${token}`;
// }
module.exports = {
  requireAuth,
};
