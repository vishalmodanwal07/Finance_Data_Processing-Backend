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
        type : String,
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

recordSchema.index({ type: 1, category: 1, date: -1 });
recordSchema.index({ createdBy: 1, date: -1 });
recordSchema.index({ deletedAt: 1 });

recordSchema.pre(/^find/ , function(next){
    this.where({ deletedAt : null});
})

export const Record = mongoose.model("Record" , recordSchema);