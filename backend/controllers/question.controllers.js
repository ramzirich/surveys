// const { db } = require("../configs/db.configs");

const {Question, Answer} = require("../models/answer.model");

const createQuestionWithAnswers = async (req, res) => {
  try {
    const { text, answerChoiceIds  } = req.body;
    const answerChoices = await Answer.find({ _id: { $in: answerChoiceIds } });

    const newQuestion = new Question({
      text,
      answerChoices:answerChoices.map(choice => ({ _id: choice._id, text: choice.text })),
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

const getQuestionById = (req, res) => {
  const id = req.params.id;
  Question.findById(id)
  .then(question => {
    if (!question) {
      res.status(404).send({error :'Answer not found.'});
    } else {
      res.status(200).send({ question });
    }
  })
  .catch(error => {
    res.status(500).send({ error: error });
  });
};

const updateQuestion = async (req, res) => {
  try {
    const  questionId  = req.params.id;
    // console.log(questionId)
    const { text, answerChoicesToAddIds, answerChoiceIdToDelete } = req.body;
    console.log(answerChoiceIdToDelete)
   

    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      return res.status(404).json({ error: 'Question not found.' });
    }

    if (text) {
      existingQuestion.text = text;
    }

    if (answerChoicesToAddIds) {
      const newAnswerChoice = await Answer.find({ _id: { $in: answerChoicesToAddIds } });
      // const newAnswerChoices = answerChoicesToAdd.map(choice => ({ text: choice }));
      existingQuestion.answerChoices.push(...newAnswerChoice);
    }

    // if (answerChoicesToUpdate) {
    //   answerChoicesToUpdate.forEach(updatedChoice => {
    //     const choiceToUpdate = existingQuestion.answerChoices.find(choice => choice._id.toString() === updatedChoice._id);
    //     if (choiceToUpdate) {
    //       choiceToUpdate.text = updatedChoice.text;
    //     }
    //   });
    // }

    if (answerChoiceIdToDelete) {
      // const idsToDelete = answerChoiceIdsToDelete.map(id => mongoose.Types.ObjectId(id));
      // existingQuestion.answerChoices = existingQuestion.answerChoices.filter(choice => !idsToDelete.includes(choice._id));
      existingQuestion.answerChoices = existingQuestion.answerChoices.filter(
        choice => choice._id.toString()!== answerChoiceIdToDelete,
        // console.log(choice._id)
      );

    //   existingQuestion.answerChoices.forEach(choice =>{
       
    //     console.log("hi",choice._id)
    // });
    }

    const updatedQuestion = await existingQuestion.save();

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
  createQuestionWithAnswers,
  getQuestionById,
  updateQuestion
};
