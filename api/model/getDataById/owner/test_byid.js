const pool = require("../../conn").pool;

const getTestByid = async (id) => {
  try {
    const query = await pool.query("select * from questions where tid = $1", [
      id,
    ]);
    const questions = query.rows.map((question) => question.value);
    const answers = [];
    for(let i = 0; i < query.rowCount; i++){
        const answer = await pool.query('select value, correct from answers where qid = $1',[query.rows[i].id]);
        answers.push(answer.rows);
    }
    return {
      success: true,
      questions: questions,
      answers: answers,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};

module.exports = getTestByid;
