const pool = require("../conn/index").pool;

const addJob = async (req) => {
  try {
    const {name, jobDescription, requireMents, offers, address, contact, jobType, location} = req.body;
    const jwtid = req.jwtid;
    let addInfo, conInfo;
    if (address && address !== "") addInfo = "";
    else addInfo = address;
    if (contact && contact !== "") conInfo = "";
    else conInfo = contact;
    const query = await pool.query(
      "INSERT INTO joblist (jobtitle,description,requirements,offerings,addInfo,coninfo,jobtype,owner_id,status,location,notifications) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        name,
        jobDescription,
        requireMents,
        offers,
        addInfo,
        conInfo,
        jobType,
        jwtid,
        true,
        location,
        0,
      ]
    );
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

module.exports = addJob;