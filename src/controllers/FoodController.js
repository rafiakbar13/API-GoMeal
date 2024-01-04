import prisma from "../db/prisma.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await prisma.food.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        rating: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    if (foods.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No foods found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while fetching foods",
    });
  }
};

export const getFood = async (req, res) => {
  const foodId = req.params.id;
  try {
    const food = await prisma.food.findUnique({
      where: {
        id: foodId,
      },
      include: {
        category: true,
      },
    });
    res.status(200).json({
      success: true,
      message: "Food fetched successfully",
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while fetching food",
    });
  }
};

// Admin
export const createFood = async (req, res) => {
  const { name, category, price, image, rating } = req.body;
  try {
    const existingFood = await prisma.food.findFirst({
      where: {
        name: { equals: name },
      },
    });
    if (existingFood) {
      return res.status(400).json({
        success: false,
        message: "Food already exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while creating food",
    });
  }
  try {
    const food = await prisma.food.create({
      data: {
        name,
        price,
        image,
        rating,
        category: {
          connect: {
            id: category,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Food created successfully",
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while creating food",
    });
  }
};

export const updateFood = async (req, res) => {
  const foodId = req.params.id;
  const { name, price, image } = req.body;
  try {
    const food = await prisma.food.update({
      where: {
        id: foodId,
      },
      data: {
        name,
        price,
        image,
      },
    });
    res.status(200).json({
      success: true,
      message: "Food updated successfully",
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while updating food",
    });
  }
};

export const deleteFood = async (req, res) => {
  const foodId = req.params.id;
  try {
    const food = await prisma.food.delete({
      where: {
        id: foodId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while deleting food",
    });
  }
};
