const express=require("express")
const {  connection}=require("./config/db")
require("dotenv").config()
const mongoose=require("mongoose")
const cors=require("cors")
const {userRoute}=require("./Routes/User.route")
const app=express()

app.use(cors({
    origin:"*"
}))

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Hoem Page Of Application ... ")
})
app.use("/user",userRoute)
app.listen(process.env.port,async()=>{

try {
    console.log("DB Connection Succsesfull")   
} catch (error) {
 console.log("Error WHile Connection to Sever")   
}




})

