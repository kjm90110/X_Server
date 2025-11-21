import express from "express";
import * as authController from "../controller/auto.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자 이상 입력")
    .matches(/^[a-zA-z0-9]+$/)
    .withMessage("특수문자는 사용 불가"),

  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자 이상 입력"),
  validate,
];

const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("name을 입력"),
  body("email").trim().isEmail().withMessage("이메일 형식 확인"),
  validate,
];

// 회원 가입
router.post("/signup", validateSignup, authController.signup);

// 로그인
router.post("/login", validateLogin, authController.login);

// 로그인 유지 확인

export default router;
