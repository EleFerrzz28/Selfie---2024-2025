import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addCat, deleteCat, getCat, modifyCat } from "../controllers/categoryController.js";

const catRouter = express.Router();

catRouter.post('/', protect, addCat);
catRouter.get('/', protect, getCat);
catRouter.delete('/:id', protect, deleteCat);
catRouter.patch('/:id', protect, modifyCat);

export default catRouter;