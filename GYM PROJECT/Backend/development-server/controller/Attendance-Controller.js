const { Members, Attendance } = require("../models");

// get attendance details
async function getAttendance(req, res) {
  console.log("punda");
  let u = req.u;
  try {
    if (u.length > 0) {
      return res.status(200).send({ user: u });
    } else {
      return res.status(404).send({ error: "Unauthorized" });
    }
  } catch (e) {
    console.log(e);
  }
}

// posting attendance
async function postAttendance(req, res) {
  const atd = req.body;
  console.log(atd);
  try {
    const client_id = await Members.findOne({
      where: { client_id: atd.client_id },
      raw: true,
    });

    if (client_id == null) {
      // console.log('No user with this id')
      return res.status(203).send({ message: "No user with this id" });
    }

    const seconds = await Attendance.findAll({ raw: true });

    if (Object.keys(seconds).length != 0) {
      const count = await Attendance.findAll({
        limit: 1,
        attributes: ["id"],
        order: [["id", "DESC"]],
        raw: true,
      });

      const alrdy_mrkd = await Attendance.findAll({
        order: [["id", "DESC"]],
        where: { client_id: atd.client_id, date: new Date() },
        raw: true,
      });

      console.log(alrdy_mrkd.length);

      if (alrdy_mrkd.length < 2) {
        const attendance = await Attendance.create({
          id: Number(count[0].id) + 1,
          client_id: atd.client_id,
          status: atd.status,
          member: atd.member,
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        return res
          .status(208)
          .send({ message: "Already marked attendance for today" });
      }
    } else {
      const attendance = await Attendance.create({
        id: 1,
        client_id: atd.client_id,
        status: atd.status,
        member: atd.member,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return res.status(200).send({ message: "Success" });
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getAttendance, postAttendance };
