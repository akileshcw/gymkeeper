const { Members, Membership, sequelize } = require("../models");
const { Op, where } = require("sequelize");
const jwt = require("jsonwebtoken");

const TWILLIO_ACCOUNT_SID = process.env.TWILLIO_ACCOUNT_SID;
const TWILLIO_AUTH_TOKEN = process.env.TWILLIO_AUTH_TOKEN;
const client = require("twilio")(TWILLIO_ACCOUNT_SID, TWILLIO_AUTH_TOKEN);
var cpy_name = "GymKeeper";

// get memberships of particular member
async function getMember(req, res) {
  const uuid = req.params.uuid;
  try {
    const mshp = await Membership.findAll({
      order: [["id", "DESC"]],
      include: {
        model: Members,
        attributes: ["name", "client_id"],
        as: "memb",
      },
      where: {
        uuid: uuid,
        is_delete: false,
      },
    });
    return res.status(200).send({ membership: mshp });
  } catch (e) {
    console.log(e);
  }
}

// add memberships
async function addMembership(req, res) {
  const mbrshp = req.body;
  const uuid = req.params.uuid;
  console.log(mbrshp, uuid);
  console.log("Memberet", req.headers.authorization);
  try {
    const seconds = await Membership.findAll({ raw: true });

    const members = await Members.findAll({ raw: true });
    console.log(members);

    const membersname = await Members.findOne({ where: { uuid: uuid } });

    const phno = await Members.findOne({
      attributes: ["phonenumber"],
      where: { uuid: uuid },
    });
    console.log(phno);

    // checking for client_id

    const client_id = await Membership.findOne({
      where: { uuid: uuid },
      raw: true,
    });

    if (Object.keys(seconds).length != 0) {
      console.log("client id", client_id);
      console.log("members", members);
      if (client_id == null) {
        const mbrs_upd = await Members.update(
          {
            client_id: 1000 + Number(members.length),
            updatedAt: new Date(),
          },
          { where: { uuid: uuid } }
        );
      }

      const count = await Membership.findAll({
        limit: 1,
        attributes: ["id"],
        order: [["id", "DESC"]],
        raw: true,
      });

      const nw_mmbrshp = await Membership.create({
        id: Number(count[0].id) + 1,
        uuid: uuid,
        month: mbrshp.mon,
        days: mbrshp.dat,
        tot_amount: mbrshp.tot_amount,
        amount_paid: mbrshp.amount_paid,
        balance: mbrshp.balance,
        frmdate: mbrshp.fdate,
        todate: mbrshp.todate,
        mop: mbrshp.mop,
        status: "Active",
        is_delete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      client.messages
        .create({
          body: `Hello ${
            membersname["dataValues"].name
          }. We have received your payment of ₹${
            mbrshp.tot_amount
          }. Your balance is ${mbrshp.balance}. 
Following are your membership details
Your ID: ${1000 + Number(members.length)}
Membership Start Date: ${mbrshp.fdate}
Membership Expiry Date: ${mbrshp.todate}
Plan: ${mbrshp.mon} months ${mbrshp.dat ? mbrshp.dat : `0`} days
Amount paid: ${mbrshp.amount_paid}
Payment Mode: ${mbrshp.mop}
We wish to serve you to fulfil your fitness goals NATURALLY and through an active lifestyle. 

Thanks,
${membersname["dataValues"].org_name}
Stay Fit✌️ Stay Strong💪`,
          from: "whatsapp:+918531058391",
          to: `whatsapp:+91${phno.phonenumber}`,
        })
        .then((message) => console.log(message.sid))
        .done();

      return res.status(200).send({ message: "Successfull" });
    } else {
      if (client_id == null) {
        const mbrs_upd = await Members.update(
          {
            client_id: 1001,
            updatedAt: new Date(),
          },
          { where: { uuid: uuid } }
        );
      }

      const nw_mmbr = await Membership.create({
        id: 1,
        uuid: uuid,
        month: mbrshp.mon,
        days: mbrshp.dat,
        tot_amount: mbrshp.tot_amount,
        amount_paid: mbrshp.amount_paid,
        balance: mbrshp.balance,
        frmdate: mbrshp.fdate,
        todate: mbrshp.todate,
        mop: mbrshp.mop,
        status: "Active",
        is_delete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      client.messages
        .create({
          body: `Hello ${
            membersname["dataValues"].name
          }. We have received your payment of ₹${
            mbrshp.tot_amount
          }. Your balance is ${mbrshp.balance}. 
Following are your membership details
Your ID: ${1000 + Number(members.length)}
Membership Start Date: ${mbrshp.fdate}
Membership Expiry Date: ${mbrshp.todate}
Plan: ${mbrshp.mon} months ${mbrshp.dat ? mbrshp.dat : `0`} days
Amount paid: ${mbrshp.amount_paid}
Payment Mode: ${mbrshp.mop}
We wish to serve you to fulfil your fitness goals NATURALLY and through an active lifestyle. 

Thanks,
${cpy_name}
Stay Fit✌️ Stay Strong💪`,
          from: "whatsapp:+918531058391",
          to: `whatsapp:+91${phno.phonenumber}`,
        })
        .then((message) => console.log(message.sid))
        .done();
      return res.status(200).send({ message: "Successful" });
    }
  } catch (e) {
    console.log(e);
  }
}

// get memberships for edit
async function getMembershipsForEdit(req, res) {
  const id = req.params.id,
    uuid = req.params.uuid;
  console.log("uuid,id", uuid, id);
  try {
    const mshp = await Membership.findAll({
      where: {
        id: id,
        uuid: uuid,
      },
    });
    return res.status(200).send({ membership: mshp });
  } catch (e) {
    console.log(e);
  }
}

// edit memberships
async function editMembership(req, res) {
  try {
    const mbshp = req.body;
    console.log(mbshp);
    const id = req.params.id,
      uuid = req.params.uuid;

    const mshp = await Membership.update(
      {
        month: mbshp.mon,
        days: mbshp.days,
        frmdate: mbshp.fdate,
        todate: mbshp.todate,
        tot_amount: mbshp.tot_amount,
        amount_paid: mbshp.amount_paid,
        balance: mbshp.balance,
        mop: mbshp.mop,
        updatedAt: new Date(),
      },
      { where: { id: id, uuid: uuid } }
    );
    return res.status(200).send({ membership: mshp });
  } catch (e) {
    console.log(e);
  }
}

// get overall memberships
async function getMemberships(req, res) {
  try {
    const memberships = await Membership.update(
      {
        status: "Expired",
        updatedAt: new Date(),
      },
      { where: { todate: new Date().toUTCString().slice(0, 16) } }
    );

    const active = await Membership.findAll({
      order: [["todate", "ASC"]],
      include: {
        model: Members,
        attributes: ["name", "phonenumber", "client_id"],
        as: "memb",
      },
      where: { status: "Active", is_delete: false },
    });

    const expired = await Membership.findAll({
      order: [["todate", "ASC"]],
      include: {
        model: Members,
        attributes: ["name", "phonenumber", "client_id"],
        as: "memb",
      },
      where: { status: "Expired", is_delete: false },
    });
    console.log(expired);
    const me = await Membership.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("uuid")), "uuid"]],
      raw: true,
    });
    let m = [];
    me.map((e) => {
      m.push(e.uuid);
    });
    const pending = await Members.findAll({
      where: { uuid: { [Op.notIn]: m } },
      raw: true,
    });
    return res.status(200).send({
      active: active,
      pending: pending,
      expired: expired,
    });
  } catch (e) {
    console.log(e);
  }
}

// delete memberships
async function deleteMembership(req, res) {
  const id = req.params.id;

  try {
    const del = await Membership.update(
      {
        is_delete: true,
      },
      { where: { id: id } }
    );
    return res.status(200).send({ message: "Success" });
  } catch (e) {
    console.log(e);
  }
}

async function getAttendance(req, res) {
  let u = req.u;
  try {
    if (u.length > 0) {
      const mmbrshps = await Membership.findAll({
        order: [["id", "DESC"]],
        limit: 1,
        include: {
          model: Members,
          attributes: ["name", "phonenumber", "client_id", "image"],
          as: "memb",
          where: { client_id: `${req.body.id}` },
        },
      });
      return res.status(200).send({ at: mmbrshps, message: "Success" });
    } else {
      return res.status(404).send({ error: "Unauthorized" });
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getMember,
  addMembership,
  getMembershipsForEdit,
  editMembership,
  getMemberships,
  deleteMembership,
  getAttendance,
};
