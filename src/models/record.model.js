import mongoose , {Schema} from "mongoose";
import { avaliableAmountType } from "../utils/constants.js";

const recordSchema = new Schema({
    amount : {
        type : Number,
        required : [true, "Amount is required"],
        min : 0
    },
    type : {
        type : String,
        enum : avaliableAmountType,
        required : [true , "Amount Type is required"]
    },
    category : {
        type : String,
        required : [true , "Category is required"],
        trim : true,
    },
    date : {
        type : Date,
        required : [true , "Date is required"]
    },
    notes : {
        type : string,
        trim : true,
        default: ''
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    deletedAt : {
        type : Date,
        default : null
    },
} , {
    timestamps : true
});

recordSchema.pre(/^find/ , function(next){
    this.where({ deletedAt : null});
})

export const record = mongoose.model("Record" , recordSchema);