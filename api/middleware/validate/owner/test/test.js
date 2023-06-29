const xssFilters = require("xss-filters");

const validity = (req, res, next) => {
  const msg = [];
  const setMsg = (m) => msg.push(m)
  try {
    const question = req.body.testdata.questions;
    const util = () => {
      let k = 0;
      if (Array.isArray(question) === false) {
        setMsg("Add at least one question!!");
        return false;
      }
      if (question.length <= 0) {
        setMsg("Add at least one question!");
        return false;
      }
      const answers = Array.from({length : question.length} ,() => []),
        questions = [];
      question.forEach((el, quesIndex) => {
        if (el.hasOwnProperty("question") === false) {
          setMsg("Invalid format.");
          return false;
        }

        if (el.hasOwnProperty("answers") === false) {
          setMsg("Invalid details.");
          return false;
        }

        question[quesIndex].question = xssFilters.inHTMLData(el.question);

        if (el.question.length === 0) {
          setMsg("Questions should have length more than 1 word.");
          return false;
        }
        if (Array.isArray(el.answers) === false) {
          setMsg("Add at least one answer to each question");
          return false;
        }
        if (el.answers.length <= 0) {
          setMsg("Add at least one answer to each question");
          return false;
        }
        let c = 0;
        el.answers.forEach((ans, ansIndex) => {
          if (
            ans.hasOwnProperty("answer") === false ||
            ans.hasOwnProperty("correct") === false
          ) {
            setMsg("Each question must have atleast one correct answer. ");
            return false;
          }
          question[quesIndex].answers[ansIndex].answer = xssFilters.inHTMLData(
            ans.answer
          );
          if (ans.answer.length === 0) {
            setMsg("Answers should not be empty.");
            return false;
          }
          if (ans.correct === true) c++;
          answers[quesIndex].push(ans);
        });
        if (c === 0) {
          setMsg("Each question must have atleast one correct answer. ");
          return false;
        }
        questions.push(el.question);
      });

      req.answers = JSON.stringify(answers);
      req.questions = JSON.stringify(questions);
      delete req.body.testdata;
      return true;
    };
    let handler = util();
    if (handler) {
      next();
    } else res.status(500).json({ success: false, msg: msg ? msg : "" });
  } catch (err) {
    res.status(500).json({ success: false, msg: msg ? msg : "" });
  }
};

module.exports = validity;
