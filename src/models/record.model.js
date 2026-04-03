import mongoose , {Schema} from "mongoose";
import { avaliableAmountType } from "../utils/constants.js";

const recordSchema = new Schema({
    amount : {
        type : Number,
        required : [true, "Amount is required"]
    },
    type : {
        type : String,
        enum : avaliableAmountType,
        required : [true , "Amount Type is required"]
    },
    category : {
        type : String,
        required : [true , "Category is required"],
        trim : true
    },
    date : {
        type : Date,
        required : [true , "Date is required"]
    },
    notes : {
        type : string
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
} , {
    timestamps : true
});

export const record = mongoose.model("Record" , recordSchema);