const express = require("express");

const {
    createQuestionWithAnswers,
    getQuestionById,
    updateQuestion
} = require("../controllers/question.controllers");
const router = express.Router();

router.post("/addQuestion", createQuestionWithAnswers);
router.get("/:id", getQuestionById);
router.post("/updateQuestion/:id", updateQuestion);

module.exports = router;