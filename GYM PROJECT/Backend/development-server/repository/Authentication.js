const {
  expiry_membership_router,
  expired_membership_router,
} = require("./Membership");
const jwt = require("jsonwebtoken");
const { Authentication } = require("../models");

async function Auth(req, res, next) {
  // expiry_membership_router()
  // expired_membership_router()
  let u = [];
  let access_token = req.headers["authorization"];
  console.log("");
  if (access_token) {
    access_token = access_token.split(" ");
    access_token = access_token[1];
    jwt.verify(
      access_token,
      process.env.TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log()
          return res.status(401).send({ expires: "Token Expires" });
        } else {
          const uuid = decodedToken.uuid;
          const user = await Authentication.findAll({
            attributes: ["name", "email", "role", "org_name", "uuid"],
            where: {
              uuid: uuid,
            },
            raw: true,
          });

          if (user.length > 0) {
            u.push(user[0]);
            req.u = u;
            next();
          } else {
            console.log("error");
            return res.status(401).send({ error: "Unauthorized" });
          }
        }
      }
    );
  } else {
    console.log("error");
    return res.status(401).send({ error: "send the token" });
  }
}

module.exports = { Auth };
