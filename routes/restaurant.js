import express from "express";
import {
  create,
  deleteRestarunt,
  restaurantDetails,
} from "../controllers/restaurant.js";
import { authorizeRoles, isAuthenticationUser } from "../middleware/auth.js";
const router = express.Router();

router
  .route("/getDetails")
  .get(isAuthenticationUser, authorizeRoles("User"), restaurantDetails);
router
  .route("/create")
  .post(isAuthenticationUser, authorizeRoles("admin"), create);
router
  .route("/delete/:restaurantId")
  .delete(isAuthenticationUser, authorizeRoles("admin"), deleteRestarunt);

export const restaurant = router;
