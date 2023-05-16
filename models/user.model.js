const mongoose=require("mongoose")
const userSchima=mongoose.Schema({
   email:String,
   password:String


})

const Usermodel=mongoose.model("user",userSchima)

module.exports={
    Usermodel
}
