const { Members } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const TWILLIO_ACCOUNT_SID = process.env.TWILLIO_ACCOUNT_SID;
const TWILLIO_AUTH_TOKEN = process.env.TWILLIO_AUTH_TOKEN;
const client = require("twilio")(TWILLIO_ACCOUNT_SID, TWILLIO_AUTH_TOKEN);
var cpy_name = "GymKeeper";

// members registration
async function add_member(req, res) {

  const member = req.body;
  const uuid = uuidv4();
  try {
    const ph = await Members.findAll({
      where: {
        phonenumber: member.phonenumber,
      },
      raw: true,
    });

    if (Object.keys(ph).length != 0) {
      return res.status(208).send({ message: "Phone Number Already Exists" });
    } else {
      const nw_mmbr = await Members.create({
        // id:Number(count[0].id)+1,
        name: member.name,
        uuid: uuid,
        dob: new Date(member.dob),
        bloodgroup: member.bloodgroup,
        phonenumber: member.phonenumber,
        gender: member.gender,
        org_name: member.organization,
        profession: member.profession,
        image: req.file ? req.file.filename : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      client.messages
          .create({
              body: `Thank you for enrolling at ${member.organization}. We are delighted to serve you to achieve your fitness goals. You’ll receive the information on membership Details soon. `,
              from: 'whatsapp:+918531058391',
              to: `whatsapp:+91${member.phonenumber}`
          })
          .then(message => console.log(message.sid))
          .done();
      return res.status(200).send({ message: "Successfull" });
    }
  } catch (e) {
    console.log(e);
  }
}

// get members
async function getMembers(req, res) {
  let u = req.u;
  console.log(u);
  try {
    const members = await Members.findAll({
      raw: true,
      where: { org_name: u[0].org_name },
    });
    return res.status(200).send({ datas: members, user: u });
  } catch (e) {
    console.log(e);
  }
}

// get members for edit
async function getMembersEdit(req, res) {
  let uuid = req.params.uuid;
  console.log("null", uuid);
  try {
    const members = await Members.findOne({
      raw: true,
      where: { uuid: uuid },
    });
    return res.status(200).send({ datas: members });
  } catch (e) {
    console.log(e);
  }
}

// edit members
async function edit_member(req, res) {
  let u = req.u;
  const u_mem = req.body;
  try {
    
      const ph = await Members.findOne({
        where: {
          phonenumber: u_mem.phonenumber,
          uuid: { [Op.ne]: u_mem.uuid },
        },
        raw: true,
      });

      if (ph) {
        return res.status(208).send({ message: "Phone Number Already Exists" });
      } else {
        const edit = await Members.update(
          {
            name: u_mem.name,
            dob: new Date(u_mem.dob),
            bloodgroup: u_mem.bloodgroup,
            phonenumber: u_mem.phonenumber,
            gender: u_mem.gender,
            org_name: u[0]["org_name"],
            profession: u_mem.profession,
            image: req.file ? req.file.filename : null,
            updatedAt: new Date(),
          },
          { where: { uuid: u_mem.uuid } }
        );
        return res.status(200).send({ message: "Succesfully Updated" });
      }
    
  } catch (e) {
    console.log(e);
  }
}

module.exports = { add_member, getMembers, edit_member, getMembersEdit };
