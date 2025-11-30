const signupTime = (time) => {
     // 1) UTC 기반 Date를 한국 시간(UTC+9)으로 맞춤
    const KoreaTime= new Date(time.getTime() + 9 * 60 * 60 * 1000);

    return (
        KoreaTime.getFullYear() +
        "." +
        (KoreaTime.getMonth() + 1) +
        "." +
        KoreaTime.getDate() +
        " " +
        KoreaTime.getHours().toString().padStart(2, "0") +
        ":" +
        KoreaTime.getMinutes().toString().padStart(2, "0") +
        ":" +
        KoreaTime.getSeconds().toString().padStart(2, "0")
    );
}

module.exports = { signupTime };
