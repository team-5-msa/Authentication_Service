const {signup : signupService} = require("../services/signupService");
const {login : loginService} = require("../services/LoginService");

const signup = async (req, res) => {
    const { email, password, name } = req.body;
    console.log("auth signup 진입")

    try {
        const resultSignup = await signupService(email, password, name);

        return res.status(200).json({
            success : true,
            data : resultSignup,
            message : "Signup Successful"
        });
    } catch (err) {
        if (err.message === "EMAIL_ALREDY_EXIST") {
            return res.status(400).json({
                success : false,
                error : "EMAIL_ALREDY_EXIST"
            });
        }
        return res.status(500).json({
            success : false,
            error : "INTERNAL_SERVER_ERROR"
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("auth login 진입")

    try {
        const resultLogin = await loginService(email, password);

        return res.status(200).json({
            success: true,
            data: {
                "token" : resultLogin
            },
            message : "Login Successful"
        });
    } catch (err) {
        if (err.message === "USER_EMAIL_NOT_EXIST") {
            return res.status(400).json({
                success : false,
                error : "USER_EMAIL_NOT_EXIST"
            });
        }
        else if (err.message === "INVALID_PASSWORD") {
            return res.status(400).json({
                success : false,
                error : "INVALID_PASSWORD"
            });
        }
        return res.status(500).json({
            success : false,
            error : "INTERNAL_SERVER_ERROR"
        });
    }
}
/* 추후에 중요한 유저 정보 더 가져와야 할 때 사용할 예정
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
        valid: true,
        decoded
    })
}
*/

module.exports = { signup, login }