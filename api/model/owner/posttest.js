const pool = require("../conn").pool;

const post = async (req) => {
  try{
    const date = new Date().getDate();
    const questions = [...JSON.parse(req.questions)];
    const answers = [...JSON.parse(req.answers)];
    const id = req.jwtid;
    const query = await pool.query('insert into test (user_id) VALUES ($1) RETURNING *',[id]);
    const tid = query.rows[0].id;
    questions.map(async (question, qindex) => {
      const query = await pool.query("insert into questions (value, tid) values ($1, $2) RETURNING *",[question, tid]);
      const qid = query.rows[0].id;
      answers[qindex].map(async answer => {
        const query = await pool.query("insert into answers (value, qid, correct) values ($1, $2, $3)",
        [answer.answer, qid, answer.correct]);
      })
    })
    return {success : true};
  }
  catch(err){
    return {success : false};
  }
};

module.exports = post;