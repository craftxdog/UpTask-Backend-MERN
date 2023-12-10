import { mongoose } from "mongoose";
import bcrypt from "bcrypt"

// Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    password:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    token:{
        type: String
    },
    result:{
        type:Boolean,
        default: false,
    },
}, {
    timestamps:true,
});

userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comprobarPassword = async function(passwordForm){
    return await bcrypt.compare(passwordForm, this.password)
}

const User = mongoose.model("User", userSchema);
export default User;