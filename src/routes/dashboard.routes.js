import {Router} from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { getSummary } from "../controllers/dashboard.controllers.js";

const router = Router();

router.route('/summary').get(authentication , authorization("analyst" , "admin") , getSummary);

export default router;