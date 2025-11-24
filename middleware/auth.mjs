import jwt, { decode } from "jsonwebtoken";
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

  jwt.verify(token, "abcdef1234!@#$", async (error, decoded) => {
    if (error) {
      console.log("토큰 에러!!");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(decoded);
    const user = await authRepository.findById(decoded.id);

    if (!user) {
      console.log("아이디 없음");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log("user id:", user.id);
    console.log("user.userid:", user.userid);
    req.userid = user.userid; // 실제 아이디가 들어감

    /*
      토큰 분리 성공: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3NjM5NDM5MzI3MTUiLCJpYXQiOjE3NjM5NDM5MzQsImV4cCI6MTc2NDExNjczNH0.zMnLfPDVVOpeSw8H3TQ-V8HmHiHFOVKkJQ5VabEcxAY
      { id: '1763943932715', iat: 1763943934, exp: 1764116734 }      
      user id: 1763943932715
      user.userid: cherry
    */

    next();
  });
};
