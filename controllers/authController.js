const { userDb } = require("../firebase");
const { hashPassword, comparePassword } = require("../utils/hash");
const { signToken, verifyToken } = require("../utils/jwt");
const { signupTime } = require("../utils/time");

const signup = async (req, res) => {
    const {email, password, name} = req.body;
    console.log("auth signup 진입")

    try {
        const userRef = userDb.collection("users");
        const userEmailExist = await userRef.where("email", "==", email).get();

        if (!userEmailExist.empty) {
            return res.status(400).json({
                message : "이미 존재하는 이메일 입니다."
            })
        }

        const password_hash = await hashPassword(password);

        const newUser = {
            email,
            password_hash,
            name,
            role : "user",
            created_at : signupTime(new Date())
        };

        const userInputDB = await userRef.add(newUser);

        return res.status(200).json({
            message: "회원가입에 성공했습니다.",
            user_id : userInputDB.id
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message : err.message
        })
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("auth login 진입")

    try {
        const userRef = userDb.collection("users");
        const userEmailExist = await userRef.where("email", "==", email).get();

        if(userEmailExist.empty) {
            return res.status(400).json({
                message : "존재하지 않는 유저 이메일 입니다."
            })
        }

        const userInfo = userEmailExist.docs[0];
        const user = userInfo.data();

        const isCorrectPassword = await comparePassword(password, user.password_hash);
        if (!isCorrectPassword) {
            return res.status(401).json({
                message : "비밀번호가 틀렸습니다."
            })
        }

        const token = signToken({
            user_id : userInfo.id,
            email : user.email,
            name : user.name,
            role : user.role
        });

        return res.status(200).json({
            message : "로그인에 성공했습니다.",
            token
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message : err.message
        })
    }
}

const verify = async (req, res) => {
    const { token } = req.body;
    console.log("auth verify 진입")

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({
            message: "유효하지 않은 토큰 입니다."
        })
    }
    
    return res.status(200).json({
        valid : true,
        decoded
    })
}

module.exports = { signup, login, verify }