const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Result = require('../Models/resultModel');

exports.getAllResults = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Result.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const results = await features.query;
  console.log(results);
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results: results,
    },
  });
});

exports.getResult = catchAsync(async (req, res, next) => {
  const result = await Result.findOne(
    {
      contestNumber: req.params.contestNumber,
      Results: { $elemMatch: { usn: req.params.usn } },
    },
    {
      'Results.$': 1,
    }
  );
  console.log(result);
  if (!result || !result.Results.length) {
    return next(new AppError('Result not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      Result: result.Results[0],
    },
  });
});

exports.createResult = catchAsync(async (req, res, next) => {
  const newResult = await Result.create(req.body);

  res.status(200).json({
    status: 'success',
    results: newResult,
  });
});

exports.deleteResult = catchAsync(async (req, res, next) => {
  const result = await Result.findOneAndDelete({
    contestNumber: req.params.contestNumber,
  });

  if (!result) {
    return next(new AppError('Result not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
