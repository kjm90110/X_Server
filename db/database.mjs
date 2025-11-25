import { config } from "../config.mjs";
import MongoDB from "mongodb";

let db;

export async function connectDB() {
    return await MongoDB.MongoClient.connect(config.db.host).then((client) => {
        db = client.db("aidetect");
    });
}

export function getUsers() {
    return db.collection("users"); // collection 생성 또는 선택
}

export function getPosts() {
    return db.collection("posts");
}
