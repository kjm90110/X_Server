import * as authRepository from "../data/auth.mjs";

export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const user = await authRepository.registUser(userid, password, name, email);
  return res.status(201).json(user);
}

export async function login(req, res, next) {
  const { userid, password } = req.body;
  const loginUser = await authRepository.login(userid, password);
  if (loginUser) {
    res.status(200).json({ message: `${loginUser[0].name}님, 안녕하세요!` });
  } else {
    res.status(404).json({ message: "로그인 실패." });
  }
}
