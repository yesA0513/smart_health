document.getElementById("checkup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // 기본 form 제출 방지

    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const ssn = document.getElementById("ssn").value;

    // 입력값 검증
    if (!name || !dob || !ssn) {
        alert("모든 필드를 입력해 주세요.");
        return;
    }

    // 주민등록번호 형식 체크 (하이픈 포함 / 제외 모두 허용)
    const ssnPattern = /^(?:\d{6}-\d{7}|\d{13})$/;
    if (!ssnPattern.test(ssn)) {
        alert("올바른 주민등록번호를 입력해 주세요.");
        return;
    }

    // 예시 데이터: 실제 서비스에서는 API를 통해 데이터를 받아야 함
    const checkupData = getCheckupHistory(name, dob, ssn);

    // 결과 출력
    if (checkupData) {
        document.getElementById("name-result").textContent = "이름: " + name;
        document.getElementById("dob-result").textContent = "생년월일: " + dob;
        document.getElementById("checkup-history").textContent = "받은 진료: " + checkupData.history;

        // 입력 폼 숨기고 진료 현황 보여주기
        document.getElementById("checkup-form").style.display = "none"; // 입력 폼 숨기기
        document.getElementById("checkup-result").style.display = "block"; // 결과 영역 보이기
    } else {
        alert("조회된 진료 현황이 없습니다.");
    }
});

// 돌아가기 버튼 클릭 시 입력 폼으로 돌아가기
document.getElementById("back-btn").addEventListener("click", function () {
    document.getElementById("checkup-form").style.display = "block"; // 입력 폼 보이기
    document.getElementById("checkup-result").style.display = "none"; // 결과 영역 숨기기
});

// 예시 데이터 반환 함수 (실제 서비스에서는 서버 API 호출)
function getCheckupHistory(name, dob, ssn) {
    // 이름, 생년월일, 주민등록번호에 따른 진료 데이터를 임시로 반환
    // 실제 서비스에서는 서버와 통신하여 데이터를 받아와야 합니다.

    // 예시로 '홍길동'이라는 이름의 사람은 건강검진과 폐암 검사를 받았다고 가정
    if (name === "홍길동" && dob === "1990-01-01" && ssn === "9001011234567") {
        return {
            history: "건강검진, 폐암 검사"
        };
    }

    // 예시로 다른 사람에 대한 진료 내역 추가
    if (name === "김철수" && dob === "1985-05-05" && ssn === "8505051234567") {
        return {
            history: "건강검진, 당뇨병 검사, 유방암 검사"
        };
    }

    // 예시로 또 다른 사용자에 대한 진료 내역 추가
    if (name === "박영희" && dob === "1978-08-08" && ssn === "7808081234567") {
        return {
            history: "건강검진, 위암 검사"
        };
    }

    // 찾을 수 없으면 null 반환
    return null;
}
