import { db } from "../db/database.mjs";

// export async function getUsers() {
//     return users;
// }

// export async function login(userid, password) {
//     const user = users.filter(
//         (user) => user.userid == userid && user.password == password
//     );
//     return user;
// }

export async function registUser(newUser) {
    const { userid, password, name, email, url } = newUser;
    return db
        .execute(
            "insert into users (userid, password, name, email, url) values(?, ?, ?, ?, ?)",
            [userid, password, name, email, url]
        )
        .then((result) => result[0].insertId);
    // result는 [ResultSetHeader, FieldPacket[]] 형태의 배열
    // result[0] = 실제 쿼리 결과 (ResultSetHeader 객체)
    // result[1] = 필드 정보 (보통 사용 안 함)

    /*
        result[0]
        {
          fieldCount: 0,
          affectedRows: 1,        // 영향받은 행 수
          insertId: 15,           // AUTO_INCREMENT로 생성된 ID
          info: '',
          serverStatus: 2,
          warningStatus: 0,
          changedRows: 0          // UPDATE 시 실제 변경된 행 수
        }
    */
}

export async function findByUserId(userid) {
    return db
        .execute("select idx, password from users where userid=?", [userid])
        .then((result) => {
            console.log("result[0][0]:", result[0][0]);
            return result[0][0];
        });
}

export async function findById(idx) {
    return db
        .execute("select idx, userid from users where idx=?", [idx])
        .then((result) => result[0][0]);
}

// export async function updateUser(id, password, name, email, url) {
//     const user = getUser(id);
//     if (user) {
//         user.password = password;
//         user.name = name;
//         user.email = email;
//         user.url = url;
//     }
//     return user;
// }

// export async function deleteUser(id) {
//     users = users.filter((user) => user.userid != id);
// }
