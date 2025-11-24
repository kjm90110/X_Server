import express from "express";
import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

async function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, {
        expiresIn: config.bcrypt.saltRounds,
    });
}

export async function signup(req, res, next) {
    const { userid, password, name, email } = req.body;

    // 회원 중복 체크
    const found = await authRepository.findByUserId(userid);
    if (found) {
        return res.status(409).json({ message: `${userid}이 이미 있습니다` });
    }

    const hashed = bcrypt.hashSync(password, config.bcrypt.saltRounds);
    const user = await authRepository.registUser(userid, hashed, name, email);
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

    const token = await createJwtToken(loginUser.id);
    res.status(200).json({ token, loginUser });
}

export async function me(req, res, next) {
    // const user = await authRepository.findByUserId(req.id);
    // if (!user) {
    //   return res.status(404).json({ message: "일치하는 사용자가 없음" });
    // }
    // res.status(200).json({ token: req.token, userid: user.userid });
    res.status(200).json({ message: "성공했어~" });
}
