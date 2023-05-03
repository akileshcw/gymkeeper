const { Authentication, Members, Membership } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const smtpTransport = require("nodemailer-smtp-transport");
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: "kamalesh1132002@gmail.com",
      pass: "rqnpujthtcyydpsk",
    },
  })
);

// signup
async function signup(req, res) {
  const usr = req.body;
  console.log(usr);
  const hsh_pass = await bcrypt.hash(usr.password, 10);
  const uuid = uuidv4();
  try {
    const mail = await Authentication.findAll({
      where: {
        email: usr.email,
      },
      raw: true,
    });

    if (Object.keys(mail).length != 0) {
      return res.status(208).send({ message: "Mail Already Exists" });
    } else {
      const nw_usr = await Authentication.create({
        uuid: uuid,
        email: usr.email,
        name: usr.name,
        role: usr.role,
        org_name: usr.org_name,
        password: hsh_pass,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.status(200).send({ message: "Successfull" });
    }
  } catch (e) {
    console.log(e);
  }
}

// signin
async function signin(req, res) {
  const usr = req.body;
  try {
    const user = await Authentication.findOne({
      where: {
        email: usr.email,
      },
      raw: true,
    });

    if (user == null || user == undefined) {
      return res.status(208).send({ message: "Email not exists" });
    } else {
      const pass = await bcrypt.compare(usr.password, user.password);
      if (pass) {
        const access_token = jwt.sign(
          { uuid: user.uuid },
          process.env.TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        const refresh_token = jwt.sign(
          { uuid: user.uuid },
          process.env.TOKEN_SECRET,
          { expiresIn: "2d" }
        );

        return res.status(200).send({
          message: "Logged in Successfull",
          ...user,
          access_token,
          refresh_token,
        });
      } else {
        return res.status(401).send({ message: "Wrong Password" });
      }
    }
  } catch (e) {
    return e;
  }
}

// dashboard
async function dashboardHome(req, res) {
  let u = req.u;

  // const today = new Date(); // Get today's date
  // fromDate: { [Op.lte]: today }, // From date should be less than or equal to today's date
  // toDate: { [Op.gte]: today }, // To date should be greater than or equal to today's date

  try {
    const members = await Members.count({
      where: {
        org_name: u[0].org_name,
      },
    });
    const active_members = await Membership.count(
      {
        distinct: true,
        col: "uuid",
        include: [
          {
            model: Members,
            where: {
              org_name: u[0].org_name,
            },
            as: "memb",
          },
        ],
      },
      {
        where: {
          status: "Active",
          is_delete: false,
        },
      }
    );

    const expired_members = await Membership.count(
      {
        distinct: true,
        col: "uuid",
        include: [
          {
            model: Members,
            where: {
              org_name: u[0].org_name,
            },
            as: "memb",
          },
        ],
      },
      {
        where: {
          status: "Expired",
          is_delete: false,
        },
      }
    );

    const todate = await Membership.findAll(
      {
        distinct: true,
        col: "uuid",
        include: [
          {
            model: Members,
            where: {
              org_name: u[0].org_name,
            },
            as: "memb",
          },
        ],
      },
      {
        attributes: ["todate"],
        raw: true,
        where: { is_delete: false },
      }
    );

    let exp_soon = 0;

    for (let i = 0; i < todate.length; i++) {
      let dates = [];
      let start_date = new Date(todate[i].todate);
      let end_date = new Date(todate[i].todate);
      start_date.setDate(start_date.getDate() - 5);
      while (start_date < end_date) {
        dates.push(new Date(start_date).toUTCString().slice(0, 16));
        start_date.setDate(start_date.getDate() + 1);
      }

      if (dates.includes(new Date().toUTCString().slice(0, 16))) {
        ++exp_soon;
      }
    }

    return res.status(200).send({
      members: members,
      active: active_members,
      expired: expired_members,
      "expired soon": exp_soon,
    });
  } catch (e) {
    console.log(e);
  }
}

// refresh token
async function refresh_token(req, res) {
  const refresh_token = req.body.refresh_token;
  console.log(refresh_token);
  try {
    jwt.verify(
      refresh_token,
      process.env.TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log("error");
          return res
            .status(401)
            .send({ expires: "Token Expires Signin Again" });
        } else {
          const uuid = decodedToken.uuid;

          const access_token = jwt.sign(
            { uuid: uuid },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          const refresh_token = jwt.sign(
            { uuid: uuid },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          console.log("success");
          return res.status(200).send({
            message: "New Access Token Renewed",
            access_token,
            refresh_token,
          });
        }
      }
    );
  } catch (e) {
    console.log(e, "value");
  }
}

//Edit Profile
async function editProfile(req, res) {
  const user = req.body;
  var hsh_pass;
  try {
    if (user.name && user.email && !user.opass && !user.npass) {
      const check = await Authentication.findOne({
        where: { email: user.email, uuid: { [Op.ne]: user.uuid } },
        raw: true,
      });

      if (check != null || check != undefined) {
        return res.status(208).send({ message: "Mail Already Exists" });
      }

      const edit = await Authentication.update(
        {
          name: user.name,
          email: user.email,
          updatedAt: new Date(),
        },
        { where: { uuid: user.uuid } }
      );

      return res.status(200).send({ message: "Updated successfully" });
    } else {
      hsh_pass = await bcrypt.hash(user.npass, 10);
      const check = await Authentication.findOne({
        where: { uuid: user.uuid },
        raw: true,
      });

      const pass_ver = await bcrypt.compare(user.opass, check.password);
      if (pass_ver) {
        const edit = await Authentication.update(
          {
            password: hsh_pass,
            updatedAt: new Date(),
          },
          { where: { uuid: user.uuid } }
        );
        return res.status(200).send({ message: "Updated successfully" });
      } else {
        console.log("error");
        return res.status(401).send({ message: "Current Password is wrong" });
      }
    }
  } catch (e) {
    console.log(e);
  }
}

// Forget Password
async function forgetPassword(req, res) {
  const email = req.body.email;
  try {
    const find = await Authentication.findOne({ where: { email: email } });
    if (find == null) {
      return res.status(208).send({ error: "Email not Exists" });
    } else {
      const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
        expiresIn: "15m",
      });

      const link = `http://localhost:3000/reset_password/${token}`;

      var mailOptions = {
        from: "kamalesh1132002@gmail.com",
        to: email,
        subject: "ResetPassword",
        html: `<h3>Raw Fitness Gym</h3>
                <p>Click this <b><a href=${link}>Link</a></b> to reset your password</p>
                <p>Link will valid only for 15 minutes.</p>
                <p style='text-align:left'>Thanks & Regards</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).send({ message: "Check you mail" });
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

// Reset Password
async function resetPassword(req, res) {
  const token = req.params.token;
  const p = req.body;
  const hsh_pass = await bcrypt.hash(p.password, 10);
  try {
    const verify = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          return res.status(401).send({ expired: "Link Expired" });
        } else {
          const update = await Authentication.update(
            {
              password: hsh_pass,
              updatedAt: new Date(),
            },
            { where: { email: decodedToken.email } }
          );

          return res
            .status(200)
            .send({ message: "Password Updated Successfully" });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
}

// Logout
async function logout(req, res) {
  try {
    res.clearCookie("jwt");
    // res.cookie('jwt', {expires: Date.now()},{path: '/'});
    u = [];
    return res.status(200).send({ message: "User Logedout" });
  } catch (e) {
    console.log(e);
  }
}

const token_verify = async (req, res) => {
  let token = req.headers.authorization;

  console.log("Token nnn", token);

  try {
    token = token.split(" ");

    jwt.verify(token[1], process.env.TOKEN_SECRET, (err) => {
      if (err) {
        return res.status(401).send({ message: "token is not valid" });
      }
      return res.status(200).send({ message: "token is valid" });
    });
  } catch (error) {
    return res.status(401).send({ message: "token is not found" });
  }
};
module.exports = {
  signup,
  signin,
  editProfile,
  forgetPassword,
  resetPassword,
  logout,
  dashboardHome,
  refresh_token,
  token_verify,
};
