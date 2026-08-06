import mongoose from "mongoose";

const userSchema = mongoose.Schema(
{
    name:{
        type: String,
        require: true
    },

 email:{
    type: String,
        require: true,
        unique: true
 },
 password:{
    type: String,
        require: true
 },
 confirmPassword:{
    type: String,
        require: true
 }

},
{
  timestamps: true,  // createdAt, UpdatedAt  
}
)

// changing user schema to the model 
const User = mongoose.model("User", userSchema);
export default User;