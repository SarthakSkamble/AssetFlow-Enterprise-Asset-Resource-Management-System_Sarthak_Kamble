import jwt from "jsonwebtoken"
import "dotenv/config";

export default function authentication_middleware(req,res,next){
 const authHeader = req.headers.authorization;
 if (!authHeader){
    return res.status(404).json({
        msg:"Token Not present"
    })
 }
 const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.organization_id= decoded.organization_id
    req.role=decoded.role

    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

}