import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "../controllers/user.controllers.js";
import { authentication } from "../middlewares/authentication.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { createUserValidator, updateUserValidator } from "../validators/userValidator.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router.use(authentication , authorization("admin"));


router.route("/").get(getAllUsers);
router.route("/:id").get(getUser);
router.route("/").post(createUserValidator() , validate , createUser);
router.route("/:id").put(updateUserValidator() ,validate ,updateUser);
router.route("/:id").delete(deleteUser);
router.route("/:id/status").patch(toggleUserStatus);

export default router;