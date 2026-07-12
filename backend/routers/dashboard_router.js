import express from "express"
import { getDashboard } from "../controller/getDashboard.js"
import authentication_middleware from "../middleware/athmiddleware.js"
const Dashboard_route=express.Router()

Dashboard_route.get("/",authentication_middleware,getDashboard)
export default Dashboard_route