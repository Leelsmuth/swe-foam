import express from 'express';
const router = express.Router();
import { getAllPictures, getPictureById, updatePicture, getPicturesInCategory } from '../controllers/pictureController.js';

router.route('/').get(getAllPictures);
router
  .route('/:id')
  .get(getPictureById)
  .put(updatePicture);
router.get('/category/:category', getPicturesInCategory);

export default router;
