document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("checkup-form");
    const checkupBtn = document.getElementById("checkup-btn");
    const backBtn = document.getElementById("back-btn");

    checkupBtn.addEventListener("click", function () {
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

        // 예시 데이터로 진료 현황 표시
        const checkupData = getCheckupHistory(name, dob, ssn);

        if (checkupData) {
            // 결과 표시
            document.getElementById("name-result").textContent = "이름: " + name;
            document.getElementById("dob-result").textContent = "생년월일: " + dob;
            document.getElementById("checkup-history").textContent = "받은 진료: " + checkupData.history;

            // 입력 폼 숨기고 결과 보여주기
            form.style.display = "none";
            document.getElementById("checkup-result").style.display = "block";
        } else {
            alert("조회된 진료 현황이 없습니다.");
        }
    });

    // 돌아가기 버튼
    backBtn.addEventListener("click", function () {
        form.style.display = "block";
        document.getElementById("checkup-result").style.display = "none";
        
        // 입력 필드 초기화
        document.getElementById("name").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("ssn").value = "";
    });

    // 주민등록번호 입력 시 자동으로 하이픈 추가
    document.getElementById("ssn").addEventListener("input", function(e) {
        let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
        
        if (value.length > 6) {
            value = value.slice(0, 6) + '-' + value.slice(6, 14);
        }
        
        e.target.value = value;
    });
});

// 예시 데이터 반환 함수 (실제 서비스에서는 서버 API 호출)
function getCheckupHistory(name, dob, ssn) {
    // 예시 데이터
    const testData = {
        "홍길동": {
            dob: "1990-01-01",
            ssn: "900101-1234567",
            history: "건강검진, 폐암 검사"
        },
        "김철수": {
            dob: "1985-05-05",
            ssn: "850505-1234567",
            history: "건강검진, 당뇨병 검사, 유방암 검사"
        },
        "박영희": {
            dob: "1978-08-08",
            ssn: "780808-2234567",
            history: "건강검진, 위암 검사"
        }
    };

    // 입력된 정보와 일치하는 데이터가 있는지 확인
    const userData = testData[name];
    if (userData && userData.dob === dob && userData.ssn === ssn) {
        return {
            history: userData.history
        };
    }

    return null;
}
