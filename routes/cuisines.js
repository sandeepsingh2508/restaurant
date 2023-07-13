import express from "express";
import {
  create,
  deleteDish,
  getAllDish,
  getDishByRestaurantId,
  update,
} from "../controllers/cuisines.js";
import { authorizeRoles, isAuthenticationUser } from "../middleware/auth.js";
const router = express.Router();

router
  .route("/getAll")
  .get(isAuthenticationUser, authorizeRoles("User"), getAllDish);
router
  .route("/get/:restaurantId")
  .get(isAuthenticationUser, authorizeRoles("User"), getDishByRestaurantId);
router
  .route("/create/:restaurantId")
  .post(isAuthenticationUser, authorizeRoles("admin"), create);
router
  .route("/update/:cuisinesId")
  .put(isAuthenticationUser, authorizeRoles("admin"), update);
router
  .route("/deleteDish/:cuisinesId")
  .delete(isAuthenticationUser, authorizeRoles("admin"), deleteDish);
export const cuisines = router;
