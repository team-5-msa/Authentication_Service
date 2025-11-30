const { userDb } = require("../firebase");
const { comparePassword } = require("../utils/hashUtils");
const { signToken } = require("../utils/jwtUtils");

const login = async (email, password) => {
    const userRef = userDb.collection("users");
    const userEmailExist = await userRef.where("email", "==", email).get();

    if (userEmailExist.empty) {
        throw new Error("USER_EMAIL_NOT_EXIST");
    }

    const userInfo = userEmailExist.docs[0];
    const user = userInfo.data();

    const isCorrectPassword = await comparePassword(password, user.password_hash);
    if (!isCorrectPassword) {
        throw new Error("INVALID_PASSWORD");
    }


    const token = signToken({
        user_id: userInfo.id,
        email: user.email,
        name: user.name,
        role: user.role
    });

    return token;
}


module.exports = { login }