const pool = require("../conn/index").pool;
const bcrypt = require("bcrypt");

const insertIntoSeeker = async (body, dp, resume) => {
  const { name, email, remote, desc, address, country } = body;
  console.log("Body: ",body)
  const password = bcrypt.hashSync(body.password, 10);
  try{
    const query = await pool.query(
      "INSERT INTO info (name,email,password,bio,address,country,resume,dp,remote) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [name, email, password, desc, address, country, resume, dp, remote]
    );
    if (query) return true;
    return false;
  }
  catch(err){
    return false;
  }
};

const insertIntoOwner = async (body, logo) => {
  const { name, email, remote, desc, address, country } = body;
  const password = bcrypt.hashSync(body.password, 10);
  try {
    const query = await pool.query(
      "INSERT INTO ownerinfo (name,email,password,brand_info,address,country,logo,remote) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [name, email, password, desc, address, country, logo, remote]
    );
    if (query) return true;
    return false;
  } catch (err) {
    return false;
  }
};

module.exports = { insertIntoSeeker, insertIntoOwner };
