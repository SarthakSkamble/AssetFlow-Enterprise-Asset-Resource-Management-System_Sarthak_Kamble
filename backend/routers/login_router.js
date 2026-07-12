import express from "express"
import Login from "../controller/login.js"
const Login_route=express.Router()

Login_route.post("/",Login)
export default Login_route