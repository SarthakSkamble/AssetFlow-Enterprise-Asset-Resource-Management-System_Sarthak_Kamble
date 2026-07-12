import express from "express"
import index_router from "./routers/index_router.js"
import cors from "cors";
const app=express()
app.use(express.json())
app.use(cors());

app.use("/api/v1",index_router)
app.listen(3000, () => {
  console.log("Listening on 3000");
});

