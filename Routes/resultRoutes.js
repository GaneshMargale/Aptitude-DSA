const express = require('express');
const resultController = require('../Controller/resultController');

const router = express.Router();

router
  .route('/')
  .get(resultController.getAllResults)
  .post(resultController.createResult);

router.route('/:contestNumber/:usn').get(resultController.getResult);

router.route('/:contestNumber').delete(resultController.deleteResult);
module.exports = router;
