import asyncHandler from 'express-async-handler';
import Picture from '../models/pictureModel.js';

// @desc   Fetch all pictures
// @route  GET /api/pictures
// @access PUBLIC
const getAllPictures = asyncHandler(async (req, res) => {
  const pageSize = 50;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Picture.countDocuments({});
  const pictures = await Picture.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ pictures, page, pages: Math.ceil(count / pageSize) });
});

// @desc   Fetch single picture by id
// @route  GET /api/pictures/:id
// @access PUBLIC
const getPictureById = asyncHandler(async (req, res) => {
  const picture = await Picture.findById(req.params.id);

  if (picture) {
    res.json(picture);
  } else {
    res.status(404).json({ message: 'Picture not found' });
  }
});


const updatePicture = asyncHandler(async (req, res) => {
  const { category } =
    req.body;

  const picture = await Picture.findById(req.params.id);

  if (picture) {
    picture.category = category;

    const updatedPicture = await picture.save();
    res.json(updatedPicture);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const getPicturesInCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == 'desc' ? -1 : 1;

  Picture.find({
    category: { $regex: category, $options: 'i' },
  })
    .select(['-_id'])
    .limit(limit)
    .sort({ id: sort })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
});

export { getAllPictures, getPictureById, updatePicture, getPicturesInCategory };