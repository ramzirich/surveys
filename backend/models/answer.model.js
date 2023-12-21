const mongoose = require('mongoose');

const answerChoiceSchema = new mongoose.Schema({
  text: { 
    type: String, required: true 
  }
});

const questionSchema = new mongoose.Schema({
  text: { 
    type: String, required: true 
  },
  answerChoices: [answerChoiceSchema],
});

const surveySchema = new mongoose.Schema({
  title: { 
    type: String, required: true 
  },
  questions: [questionSchema],
  completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Answer = mongoose.model('Answer', answerChoiceSchema);
const Question= mongoose.model('Questions', questionSchema);
const Survey = mongoose.model('Survey', surveySchema);

module.exports ={
  Answer,
  Question,
  Survey
};