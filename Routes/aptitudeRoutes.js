const express = require('express');
const aptitudeController = require('../Controller/aptitudeController');

const router = express.Router();

router
  .route('/questions')
  .get(aptitudeController.getAllQuestions)
  .post(aptitudeController.createQuestions);

router
  .route('/answers')
  .get(aptitudeController.getAllAnswers)
  .post(aptitudeController.createAnswers);

router
  .route('/questions/:contestNumber/:questionNumber')
  .get(aptitudeController.getQuestion)
  .patch(aptitudeController.updateQuestion);

module.exports = router;
