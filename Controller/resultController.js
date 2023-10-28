const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Result = require('../Models/resultModel');
const Profile = require('../Models/userProfileModel');

exports.getAllResults = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Result.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const results = await features.query;

  results.forEach((document) => {
    document.Results.sort((a, b) => b.points - a.points);
  });

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
  const existingContest = await Result.findOne({
    contestNumber: req.params.contestNumber,
  });
  if (!existingContest) {
    const defaultResult = {
      contestNumber: req.params.contestNumber,
      Results: [],
    };

    await Result.create(defaultResult);
  }

  next();
});

exports.updateAptitudeResult = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ usn: req.params.usn });

  if (!profile) {
    return next(new AppError('Profile not found', 404));
  }

  const result = await Result.findOneAndUpdate(
    {
      contestNumber: req.params.contestNumber,
    },
    {
      $push: {
        Results: {
          usn: req.params.usn,
          name: profile.name,
          points: req.body.points,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    return next(new AppError('Question not found', 404));
  }
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
