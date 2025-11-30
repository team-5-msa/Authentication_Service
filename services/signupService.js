const { userDb } = require("../firebase");
const { hashPassword } = require("../utils/hashUtils");
const { signupTime } = require("../utils/timeUtils");

const signup = async (email, password, name) => {
    const userRef = userDb.collection("users");
    const userEmailExist = await userRef.where("email", "==", email).get();

    if (!userEmailExist.empty) {
        throw new Error("EMAIL_ALREDY_EXIST");
    }

    const password_hash = await hashPassword(password);

    const newUser = {
        email,
        password_hash,
        name,
        role: "user",
        created_at: signupTime(new Date())
    };

    const userInputDB = await userRef.add(newUser);

    return {
        user_id: userInputDB.id
    }
}

module.exports = { signup }