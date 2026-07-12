import prisma from "../prismaclient.js";
import argon2 from "argon2";

async function Signup(req, res) {
  try {
    const {
      department_id,
      name,
      email,
      password,
    } = req.body;

    const existingDepartment = await prisma.department.findUnique({
      where: { id:department_id },
    });
    if (!existingDepartment) {
      return res.status(409).json({
        msg: "Department not avaliable",
      });
    }
    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        msg: "User already exists redirecting to login",
      });
    }

    const hashedPassword = await argon2.hash(password);

    
    const newUser = await prisma.user.create({
      data: {
        departmentId:department_id,
        name,
        email,
        password: hashedPassword, 
      },
      
    });

    return res.status(201).json({
      msg: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export default Signup;