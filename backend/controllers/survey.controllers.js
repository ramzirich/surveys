// const { db } = require("../configs/db.configs");

const {Question, Survey} = require("../models/answer.model");

const createSurvey = async (req, res) => {
  try {
    const { title, questionsId  } = req.body;
    const questions = await Question.find({ _id: { $in: questionsId } });

    const newSurvey = new Survey({
      title,
      questions:questions.map(choice => ({ _id: choice._id, text: choice.text })),
    });

    const savedSurvey = await newSurvey.save();

    res.status(201).json(savedSurvey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const getSurveyById = (req, res) => {
  const id = req.params.id;
  Survey.findById(id)
  .then(survey => {
    if (!survey) {
      res.status(404).send({error :'Survey not found.'});
    } else {
      res.status(200).send({ survey });
    }
  })
  .catch(error => {
    res.status(500).send({ error: error });
  });
};

const updateSurvey= async (req, res) => {
  try {
    const  surveyId  = req.params.id;
    const { title, questionsToAddIds, questionsIdToDelete } = req.body;
    // console.log(answerChoiceIdToDelete)
  
    const existingSurvey = await Question.findById(surveyId);
    if (!existingSurvey) {
      return res.status(404).json({ error: 'Question not found.' });
    }

    if (title) {
      existingSurvey.title = title;
    }

    if (questionsToAddIds) {
      const newQuestion = await Answer.find({ _id: { $in: questionsToAddIds } });
      existingSurvey.questions.push(...newQuestion);
    }

    if (questionsIdToDelete) {
      existingSurvey.questions = existingSurvey.questions.filter(
        choice => choice._id.toString()!== questionsIdToDelete,
      );
    }

    const updatedSurvey = await existingSurvey.save();

    res.status(200).json(updatedSurvey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSurvey,
  getSurveyById,
  updateSurvey
};
