const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// ENV 우선 (fly.io 배포 환경)
if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  console.log("Firebase: ENV(base64) 모드");

  const decoded = Buffer.from(
    process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
    "base64"
  ).toString("utf8");

  
  const serviceAccount = JSON.parse(decoded);

  // credential = “인증 정보”
  // serviceAccount를 가지고 서비스 계정 인증 객체를 만들어줌
  // 즉, 이 앱은 이 서비스 계정을 사용해서 Firebase 프로젝트에 접속한다는 의미
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

} else {
  // 로컬 개발 환경 : config/firebase-service-account.json 사용
  console.log("Firebase: 로컬 JSON 파일 모드");

  const serviceAccountPath = path.join(__dirname, "config", "firebase-service-account.json");
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const userDb = admin.firestore();

module.exports = { userDb };