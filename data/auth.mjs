import MongoDB from "mongodb";
import { getUsers } from "../db/database.mjs";
const ObjectID = MongoDB.ObjectId;

export async function registUser(user) {
    return getUsers()
        .insertOne(user)
        .then((result) => result.insertedId.toString());
}

export async function findByUserId(userid) {
    // next()의 결과를 mapOptionalUser의 인자로 자동 전달
    return getUsers().find({ userid }).next().then(mapOptionalUser); // userid에 해당하는 row
}

export async function findById(id) {
    return getUsers()
        .find({ _id: new ObjectID(id) }) // id를 ObjectID 객체형으로 만듦.
        .next()
        .then(mapOptionalUser);
}

function mapOptionalUser(user) {
    return user ? { ...user, id: user._id.toString() } : user;
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
