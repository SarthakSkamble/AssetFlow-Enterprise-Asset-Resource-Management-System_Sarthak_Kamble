import prisma from "../prismaclient.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function Login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        department: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    // Check if account is active
    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        msg: "Your account is inactive. Contact the administrator.",
      });
    }

    // Verify password
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        departmentId: user.departmentId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Remove password before sending user
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      msg: "Login successful",
      token,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export default Login;