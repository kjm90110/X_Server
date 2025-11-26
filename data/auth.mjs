import { useVirtualId } from "../db/database.mjs";
import Mongoose from "mongoose";

// 테이블
// versionKey: Mongoose가 문서를 저장할 때 자동으로 추가하는 _v라는 필드를 설정
const userSchema = new Mongoose.Schema(
    {
        userid: { type: String, require: true },
        name: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        url: String, // 안 넣어도 됨
    },
    { versionKey: false }
);

useVirtualId(userSchema);
const User = Mongoose.model("User", userSchema); // curd method 만들어줌

export async function registUser(user) {
    return new User(user).save().then((data) => data.id);
}

export async function findByUserId(userid) {
    return User.findOne({ userid });
}

export async function findById(id) {
    return User.findById(id);
}

export async function updateUser(id, password, name, email, url) {
    const user = getUser(id);
    if (user) {
        user.password = password;
        user.name = name;
        user.email = email;
        user.url = url;
    }
    return user;
}

export async function deleteUser(id) {
    users = users.filter((user) => user.userid != id);
}
