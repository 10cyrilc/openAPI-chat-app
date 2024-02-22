import express from "express";
import axios from "axios";
const router = express.Router();
import jwt from "jsonwebtoken";

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": username,
          "User-Secret": password,
        },
      }
    );
    const data = chatEngineResponse.data;
    const token = jwt.sign(
      {
        username: data.username,
        is_authenticated: data.is_authenticated,
        password: password,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log(data);
    res.status(200).json({
      response: {
        token: token,
      },
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
