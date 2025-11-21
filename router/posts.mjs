import express from "express";
import * as postController from "../controller/post.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const validatePost = [
  // body 안의 text가 최소 4자리가 되는지 검사
  body("text").trim().isLength({ min: 4 }).withMessage("최소 4자 이상 입력"),
  validate, // 여기서 결과를 얻어옴
];

const router = express.Router();

// 전체 포스트 가져오기
// 특정 ID에 대한 포스트 가져오기
// http://127.0.0.1:8080/post
// http://127.0.0.1:8080/post?userid=XXX
router.get("/", postController.getPosts);

// 글 번호에 대한 포스트 가져오기
// http://127.0.0.1:8080/post/:id
router.get("/:id", postController.getPost);

// 포스트 쓰기
// http://127.0.0.1:8080/post/
router.post("/", validatePost, postController.createPost);

// 포스트 수정하기
// http://127.0.0.1:8080/post/:id
router.put("/:id", validatePost, postController.updatePost);

// 포스트 삭제하기
// http://127.0.0.1:8080/post/:id
router.delete("/:id", postController.deletePost);

export default router;
