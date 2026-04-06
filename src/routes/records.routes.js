import { Router } from "express";
import { createRecordValidator , updateRecordValidator} from "../validators/recordValidator.js";
import { authentication } from "../middlewares/authentication.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { createRecord, deleteRecord, getAllRecords, getRecord, updateRecord } from "../controllers/record.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router.use(authentication);


router.route("/").get(authorization("admin" , "viewer" , "analyst") , getAllRecords);
router.route("/:id").get(authorization("admin","viewer" , "analyst") , getRecord);
router.route("/").post(authorization("admin" , "analyst") , createRecordValidator() , validate , createRecord);
router.route("/:id").put(authorization("admin" , "analyst") , updateRecordValidator() , validate , updateRecord );
router.route("/:id").delete(authorization("admin") , deleteRecord);


export default router;