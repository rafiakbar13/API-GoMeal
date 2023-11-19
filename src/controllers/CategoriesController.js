import prisma from "../db/prisma.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while fetching categories",
    });
  }
};

export const getCategory = async (req, res) => {
  const categoryId = parseInt(req.params.id);
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        foods: true,
      },
    });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while fetching category",
    });
  }
};

// Admin
export const createCategory = async (req, res) => {
  const { name, image } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        image,
      },
    });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while creating category",
    });
  }
};

// Admin
export const updateCategory = async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const { name, image } = req.body;
  try {
    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        image,
      },
    });
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while updating category",
    });
  }
};

// Admin
export const deleteCategory = async (req, res) => {
  const categoryId = parseInt(req.params.id);
  try {
    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while deleting category",
    });
  }
};
