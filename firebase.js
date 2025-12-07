const admin = require("firebase-admin");

// Firebase 초기화 여부 확인
if (!admin.apps.length) {
  let serviceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    console.log("Firebase: 🔥 ENV 기반 인증 모드 (Vercel)");

    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    console.log("Firebase: 📁 로컬 JSON 파일 모드");

    const fs = require("fs");
    const path = require("path");

    const serviceAccountPath = path.join(__dirname, "config", "firebase-service-account.json");
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const userDb = admin.firestore();
module.exports = { userDb };
