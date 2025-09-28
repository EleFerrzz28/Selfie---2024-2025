import asyncHandler from 'express-async-handler';
import Cat from '../models/categoryModel.js';

const addCat = asyncHandler(async (req, res) => {
  const { name, color } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Category name is required");
  }

  const newCat = new Cat({
    name,
    color,
    user: req.user._id
  });

  await newCat.save();

  res.status(201).json({
    message: "Category added successfully",
    event: newCat,
  });
});

const getCat = asyncHandler(async (req, res) => {
  try {
    const categories = await Cat.find({ user: req.user._id });
    res.json(categories);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error"
    });
  }
});

const deleteCat = asyncHandler(async (req, res) => {
  const category = await Cat.findByIdAndDelete(req.params.id);
  if (category) {
    res.json({ message: "category deleted successfully!", category });
  } else {
    res.status(404);
    throw new Error("category not found.");
  }
});

const modifyCat = asyncHandler(async (req, res) => {
  const category = await Cat.findById(req.params.id);
  const { name, color } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  if (!category) {
    res.status(404);
    throw new Error("Category not found!");
  } else {
    category.name = name;
    if (color) category.color = color;
  };

  await category.save();

  res.status(200).json({
    message: "Category updated successfully",
    event: category,
  });
});

export {
  addCat,
  getCat,
  deleteCat,
  modifyCat
};