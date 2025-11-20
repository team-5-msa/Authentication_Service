## 🔐 Authentication Service API Documentation

Authentication Service는 회원가입, 로그인, JWT 검증 기능을 제공하며
Firestore Database를 기반으로 동작합니다.

**Base URL 예시:**
```
http://localhost:3001/auth
```

### 🧱 기술 스택

- Node.js
- Express
- Firebase Admin (Firestore)
- bcrypt
- jsonwebtoken (JWT)

### 🗂 Firestore 데이터 구조
**Collection : users**

```json
{
  "email": "test@example.com",
  "password_hash": "암호화된 비밀번호",
  "name": "홍길동",
  "role": "user",
  "created_at": "2025.11.20 19:52:15"
}
```
---

## 📌 1. 회원가입 (Signup)

### **POST /auth/signup**

새로운 유저를 Firestore `users` 컬렉션에 등록합니다.

### 📥 Request Body (JSON)

```json
{
  "email": "test@example.com",
  "password": "123456",
  "name": "홍길동"
}
```

### 📤 Response — 성공  
**=> Status: 200 OK**

```json
{
  "message": "회원가입에 성공했습니다。",
  "user_id": "A8hsu1bFJ29ddfa0"
}
```

### ❌ Response — 실패 : 이미 존재하는 이메일  
**=> Status: 400 BAD REQUEST**

```json
{
  "message": "이미 존재하는 이메일 입니다."
}
```
---

## 📌 2. 로그인 (Login)

### **POST /auth/login**

이메일 + 비밀번호를 검증 후 JWT 토큰을 발급합니다.

### 📥 Request Body (JSON)

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

### 📤 Response — 성공  
**=> Status: 200 OK**

```json
{
  "message": "로그인에 성공했습니다.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### ❌ Response — 실패 : 존재하지 않는 이메일  
**=> Status: 400 BAD REQUEST**

```json
{
  "message": "존재하지 않는 유저 이메일 입니다."
}
```

### ❌ Response — 실패 : 비밀번호 불일치  
**=> Status: 401 UNAUTHORIZED**

```json
{
  "message": "비밀번호가 틀렸습니다."
}
```
---

## 📌 3. 토큰 검증 (Verify Token)

### **POST /auth/verify**

클라이언트가 전달한 JWT 토큰이 유효한지 검사하고,  
유효하다면 payload(decoded 값)를 반환합니다.

### 📥 Request Body

```json
{
  "token": "eyJh..."
}
```

### 📤 Response — 성공  
**=> Status: 200 OK**

```json
{
  "valid": true,
  "decoded": {
    "user_id": "afs812sa19AA",
    "email": "test@example.com",
    "name": "홍길동",
    "role": "user"
  }
}
```

### ❌ Response — 실패 : 유효하지 않은 토큰  
**=> Status: 401 UNAUTHORIZED**

```json
{
  "message": "유효하지 않은 토큰 입니다."
}
```
---
