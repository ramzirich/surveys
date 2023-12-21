const express = require("express");

const {
    createSurvey,
    getSurveyById,
    updateSurvey
} = require("../controllers/survey.controllers");
const router = express.Router();

router.post("/addAnswer", createSurvey);
router.get("/:id", getSurveyById);
router.post("/updateAnswer/:id", updateSurvey);

module.exports = router;