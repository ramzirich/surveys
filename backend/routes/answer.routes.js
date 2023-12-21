const express = require("express");

const {
    addAnswer,
    getAnswerById,
    updateAnswerById,
} = require("../controllers/answer.controllers");
const router = express.Router();

router.post("/addAnswer", addAnswer);
router.get("/:id", getAnswerById);
router.post("/updateAnswer/:id", updateAnswerById);

module.exports = router;
