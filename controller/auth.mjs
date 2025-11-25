import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

async function createJwtToken(idx) {
    return jwt.sign({ idx }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec,
    });
}

export async function signup(req, res, next) {
    const { userid, password, name, email, url } = req.body;

    // 회원 중복 체크
    const found = await authRepository.findByUserId(userid);
    if (found) {
        return res.status(409).json({ message: `${userid}이 이미 있습니다` });
    }

    const hashed = bcrypt.hashSync(password, config.bcrypt.saltRounds);
    const user = await authRepository.registUser({
        userid,
        password: hashed,
        name,
        email,
        url,
    });
    // const user = await authRepository.registUser(userid, password, name, email);
    const token = await createJwtToken(user.id);
    console.log(token);
    res.status(201).json({ token, user });
}

export async function login(req, res, next) {
    const { userid, password } = req.body;
    const loginUser = await authRepository.findByUserId(userid);
    if (!loginUser) {
        res.status(401).json(`${loginUser}를 찾을 수 없음`);
    }

    const isValidPassword = await bcrypt.compare(password, loginUser.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "아이디 또는 비밀번호 확인" });
    }

    const token = await createJwtToken(loginUser.idx);
    res.status(200).json({ token, loginUser });
}

// 로그인 확인
export async function me(req, res, next) {
    const user = await authRepository.findById(req.idx);
    if (!user) {
        return res.status(404).json({ message: "일치하는 사용자가 없음" });
    }
    res.status(200).json({ token: req.token, idx: user.idx });
}
