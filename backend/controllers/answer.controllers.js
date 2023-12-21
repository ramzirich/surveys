// const { db } = require("../configs/db.configs");

const {Answer} = require("../models/answer.model");

const addAnswer = async (req, res) => {
  const { text } = req.body;
  // try {
  //   const answer = await Answers.create({
  //     text
  //   });
  //   res.status(200).send({ answer });
  // } catch (error) {
  //   res.status(500).send({ error });
  // }
  // //   db.query(
  // //     "INSERT INTO todos (title, description, is_done) VALUES (?, ?, ?)",
  // //     [data.title, data.description, data.is_done ?? 0],
  // //     (error, result) => {
  // //       if (error) {
  // //         res.status(500).send({ error });
  // //       } else {
  // //         res.status(200).send({ result });
  // //       }
  // //     }
  // //   );
  try {
    // const user = await User.create({ username, password, firstName, lastName });

    const answer = new Answer({
      text
    });

    await answer.save();

    res.status(200).send({ answer });
  } catch (e) {
    res.status(500).send({ error: e });
  }
};


// const getAllTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({ userId: req.user._id }).populate(
//       "userId",
//       "firstName"
//     );
//     res.status(200).send({ todos });
//   } catch (error) {
//     res.status(500).send({ error });
//   }
//   //   db.query(`SELECT * FROM todos`, (error, result) => {
//   //     if (error) {
//   //       res.status(500).send({ error });
//   //     } else {
//   //       res.status(200).send({ result });
//   //     }
//   //   });
// };

const getAnswerById = (req, res) => {
  const id = req.params.id;
  //   db.query("SELECT * FROM todos WHERE id = ?", [id], (error, result) => {
  //     if (error) {
  //       res.status(500).send({ error });
  //     } else {
  //       if (!result.length) res.status(404).send({ message: "item not found" });
  //       res.status(200).send({ result: result[0] });
  //     }
  //   });
  Answer.findById(id)
  .then(answer => {
    if (!answer) {
      res.status(404).send({error :'Answer not found.'});
    } else {
      res.status(200).send({ answer });
    }
  })
  .catch(error => {
    res.status(500).send({ error: error });
  });
};

const updateAnswerById = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Answer.findByIdAndUpdate(id, {text:data.text}, {new:true})
    .then(updatedAnswer =>{
      res.status(200).send({ answer: updatedAnswer });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  //   db.query(
  //     "UPDATE todos SET title = ?, description = ?, is_done = ? WHERE id = ?",
  //     [data.title, data.description, data.is_done, id],
  //     (error, result) => {
  //       if (error) {
  //         res.status(500).send({ error });
  //       } else {
  //         res.status(200).send({ result });
  //       }
  //     }
  //   );
};

const deleteTodoById = (req, res) => {
  const id = req.params.id;
  // db.query("DELETE FROM todos WHERE id = ?", [id], (error, result) => {
  //   if (error) {
  //     res.status(500).send({ error });
  //   } else {
  //     res.status(200).send({ result });
  //   }
  // });
};

module.exports = {
  addAnswer,
  getAnswerById,
  updateAnswerById,
};
