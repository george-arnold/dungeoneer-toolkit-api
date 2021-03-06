const express = require("express");
const signinRouter = express.Router();
const bodyParser = express.json();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const config = require("../config");

//makes the jwt
const createJwt = (subject, payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    subject,
    algorithm: "HS256",
  });
};

signinRouter
  .route("/signin")
  .post(bodyParser, (req, res, next) => {
    req.app
      .get("db")
      .select("email", "hash")
      .from("login")
      .where("email", "=", req.body.email)
      .then((data) => {
        //compares passwords
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid) {
          return req.app
            .get("db")
            .select("*")
            .from("users")
            .where("email", "=", req.body.email)
            .then((compareMatch) => {
              //looks at email that matches user input
              if (!compareMatch) {
                return res.status(400).json({
                  error: "Incorrect email or password",
                });
              }
              const sub = compareMatch[0].email;
              console.log(compareMatch[0]);
              const payload = { id: compareMatch[0].id };
              res.send({
                authToken: createJwt(sub, payload),
              });
            })
            .catch((err) => res.status(400).json("unable to get user"));
        } else {
          res.status(400).json({ password: "Password is incorrect" });
        }
      })
      .catch((err) => res.status(400).json({ email: "Email not found" }));
  })
  .post(bodyParser, (req, res) => {
    //posts using login table
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);

    req.app.get("db").transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({ email: loginEmail[0], name: name, joined: new Date() })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  });

signinRouter.route("/register").post(bodyParser, (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  req.app.get("db").transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({ email: loginEmail[0], name: name, joined: new Date() })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
});

module.exports = signinRouter;
