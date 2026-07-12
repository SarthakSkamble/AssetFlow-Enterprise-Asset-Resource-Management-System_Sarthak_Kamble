import express from "express"
import Signup from "../controller/signup.js"
const Signup_route=express.Router()

Signup_route.post("/",Signup)
export default Signup_route