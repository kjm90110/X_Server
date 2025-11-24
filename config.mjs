import dotenv from "dotenv";
dotenv.config(); // env file 안의 내용을 가져다 쓸 수 있음

// 값이 있는지 없는지 확인(없으면 그냥 undefined)
function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue; // env 읽어옴
    if (value == null) {
        throw new Error(`키 ${key}는 undefined!!`);
    }

    return value;
}

export const config = {
    jwt: {
        secretKey: required("JWT_SECRET"),
        expiresInSec: parseInt(required("JWT_EXPIRES_SEC")),
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
    },
    host: {
        port: parseInt(required("HOST_PORT", 9090)),
    },
};
