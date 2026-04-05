import {Router} from "express";
import {login, registerUser} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {userLoginValidator, userRegisterValidator} from "../validators/userValidator.js";
import { authLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.route("/register").post(authLimiter , userRegisterValidator() , validate , registerUser);
router.route("/login").post(authLimiter , userLoginValidator() , validate , login);


export default router;
