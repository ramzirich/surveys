const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema({
  survey: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Survey', 
    required: true 
},
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  answers: [
    { question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, choice: String }],
});

const Answer = mongoose.model('UserAnswer', userAnswerSchema);

module.exports = Answer;
