// routes/cartRoutes.js
import express from "express";
import verifyFirebaseToken from "../middleware/verifyFirebaseToken.js";
import { getCart, saveCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();

// ✅ GET saved cart for logged-in user
router.get("/", verifyFirebaseToken, getCart);

// ✅ PUT to save/update the cart
router.put("/", verifyFirebaseToken, saveCart);

// ✅ DELETE to clear the cart
router.delete("/", verifyFirebaseToken, clearCart);

export default router;
