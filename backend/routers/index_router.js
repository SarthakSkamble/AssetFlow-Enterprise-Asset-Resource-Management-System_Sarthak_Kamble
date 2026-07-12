import express from "express"
import Signup_route from "./signup_router.js"
import Login_route from "./login_router.js"
const index_router=express.Router()

index_router.use("/signup",Signup_route)
index_router.use("/login",Login_route)
export default index_router