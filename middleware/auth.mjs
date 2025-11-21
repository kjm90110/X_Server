import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.mjs";

const AUTH_ERROR = { message: "인증 에러" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);

  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    // 인증 실패
    console.log("Header Error");
    return res.status(401).json(AUTH_ERROR);
  }

  // 인증 성공
  const token = authHeader.split(" ")[1];
  console.log("토큰 분리 성공:", token);
  next(); // authController.me 호출
};
