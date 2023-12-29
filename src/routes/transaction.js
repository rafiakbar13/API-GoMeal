import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
  getTransactionByUserId,
  updateTransaction,
} from "../controllers/Transactions.js";

const router = express.Router();

router.post("/", createTransaction);
router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.get("/:userId", getTransactionByUserId);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
