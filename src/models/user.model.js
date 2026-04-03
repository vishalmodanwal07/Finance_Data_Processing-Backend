import mongoose , {Schema} from "mongoose";
import bcrypt  from "bcrypt";
import { avaliableUserRole } from "../utils/constants.js";
import jwt  from "jsonwebtoken";
const userSchema = new Schema({
    name : {
        type : String ,
        required : [true , 'User name is required'],
        lowercase : true,
        trim : true,
        minLength : 2,
        maxLength : 70,
        index : true
    },
    email : {
        type : String ,
        required : [true , 'user Email is required'],
        unique : true,
        lowercase : true,
        trim : true,
        match : [/\S+@\S+\.\S+/, 'please fill a valid email address'],
        index : true
    },
    password : {
        type : String,
        required : [true , "Password is required"],
        minLength : 6,
    },
    role: {
        type: String,
        required : [true , "Role is required"],
        enum: avaliableUserRole,
        required: true,
        },
    isActive : {
        type : Boolean,
        required : true,
        default : true
    },
    refreshToken : {
        type : String
    }
} , {
    timestamps : true,
});

//bcrypt the password before saving in database 
userSchema.pre("save" , async function(next){
 if(!this.isModified("password")) return next();
 this.password = await bcrypt.hash(this.password , 10);
 next();
});

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password , this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        name : this.name,
        role : this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const user = mongoose.model("User" , userSchema);