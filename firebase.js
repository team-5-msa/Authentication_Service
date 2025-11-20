const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase-service-account.json");

admin.initializeApp({
  // credential = “인증 정보”
  // serviceAccount를 가지고 서비스 계정 인증 객체를 만들어줌
  // 즉, 이 앱은 이 서비스 계정을 사용해서 Firebase 프로젝트에 접속한다는 의미
  credential: admin.credential.cert(serviceAccount)
});

const userDb = admin.firestore();

module.exports = { userDb };