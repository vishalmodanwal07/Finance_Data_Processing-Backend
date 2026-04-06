import {Router} from "express";
import {login, logoutUser, registerUser} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {userLoginValidator, userRegisterValidator} from "../validators/userValidator.js";
import { authLimiter } from "../middlewares/rateLimiter.middleware.js";
import { authentication } from "../middlewares/authentication.middleware.js";

const router = Router();

router.route("/register").post(authLimiter , userRegisterValidator() , validate , registerUser);
router.route("/login").post(authLimiter , userLoginValidator() , validate , login);
router.route("/logout").post(authentication , logoutUser);


export default router;
