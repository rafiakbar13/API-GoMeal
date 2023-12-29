// Create Transaction
export const createTransaction = async (req, res) => {
  const { amount, status, type, userId } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        status,
        type,
        userId,
      },
    });
    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while creating transaction",
    });
  }
};
// Update Transaction
export const updateTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const { amount, status, type } = req.body;
  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        amount,
        status,
        type,
      },
    });
    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while updating transaction",
    });
  }
};
// Delete Transaction
export const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;
  try {
    const transaction = await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while deleting transaction",
    });
  }
};

// Get all Transaction
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Transactions not found",
    });
  }
};
// Get Transaction by ID
export const getTransactionById = async (req, res) => {
  const transactionId = req.params.id;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Transaction fetched successfully",
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }
};
// Get Transaction by User ID
export const getTransactionByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Transactions not found",
    });
  }
};
