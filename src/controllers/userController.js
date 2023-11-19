import prisma from "../db/prisma.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        email: true,
        address: true,
        role: true,
        balance: true,
        favoriteFoods: true,
        orders: true,
        transactions: true,
        bills: true,
      },
    });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Users not found",
    });
  }
};

export const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        address: true,
        role: true,
        balance: true,
        favoriteFoods: true,
        orders: true,
        transactions: true,
        bills: true,
      },
    });
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Failed to delete user",
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        address: true,
        role: true,
        balance: true,
        favoriteFoods: true,
        orders: true,
        transactions: true,
        bills: true,
      },
    });
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
};
