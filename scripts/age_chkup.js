document.addEventListener('DOMContentLoaded', () => {
    const checkupBtn = document.getElementById("checkup-btn");
    const backBtn = document.getElementById("back-btn");

    checkupBtn.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        const gender = document.getElementById("gender").value;
        const age = parseInt(document.getElementById("age").value);

        if (!name || !age || isNaN(age)) {
            alert("이름과 나이를 입력해 주세요.");
            return;
        }

        let requiredCheckups = [];
        let freeCheckups = [];

        // 나이에 따른 받아야 할 검진 목록
        if (age >= 20 && age < 30) {
            requiredCheckups.push("건강검진", "당뇨병 검사");
            if (gender === "female") {
                freeCheckups.push("자궁경부암 검사");
            }
        } else if (age >= 30 && age < 40) {
            requiredCheckups.push("건강검진", "혈압 검사", "유방암 검사");
            if (gender === "female") {
                freeCheckups.push("자궁경부암 검사");
            }
        } else if (age >= 40 && age < 50) {
            requiredCheckups.push("건강검진", "혈압 검사", "대장암 검사");
            if (gender === "female") {
                freeCheckups.push("유방암 검사");
            }
        } else if (age >= 50 && age < 60) {
            requiredCheckups.push("건강검진", "대장암 검사", "폐암 검사");
            if (gender === "female") {
                freeCheckups.push("자궁경부암 검사", "유방암 검사");
            }
        } else if (age >= 60) {
            requiredCheckups.push("건강검진", "폐암 검사", "대장암 검사");
            if (gender === "female") {
                freeCheckups.push("자궁경부암 검사", "유방암 검사");
            }
        }

        // 무료로 받을 수 있는 검진
        if (age >= 20 && age < 30) {
            freeCheckups.push("정기적인 건강 검진");
        } else if (age >= 30 && age < 40) {
            freeCheckups.push("기본적인 건강 검진");
        } else if (age >= 40 && age < 50) {
            freeCheckups.push("기본 건강 검진", "대장암 검사");
        } else if (age >= 50 && age < 60) {
            freeCheckups.push("대장암 검사", "폐암 검사");
        } else if (age >= 60) {
            freeCheckups.push("정기 건강 검진", "대장암 검사");
        }

        // 기존 내용 숨기기
        document.getElementById("checkup-form").style.display = "none";

        // 결과 출력
        const checkupResults = document.getElementById("checkup-results");
        checkupResults.style.display = "block";

        const requiredCheckupsList = document.getElementById("required-checkups");
        const freeCheckupsList = document.getElementById("free-checkups");

        requiredCheckupsList.innerHTML = "";
        freeCheckupsList.innerHTML = "";

        requiredCheckups.forEach(checkup => {
            const li = document.createElement("li");
            li.textContent = checkup;
            requiredCheckupsList.appendChild(li);
        });

        freeCheckups.forEach(checkup => {
            const li = document.createElement("li");
            li.textContent = checkup;
            freeCheckupsList.appendChild(li);
        });
    });

    // 돌아가기 버튼 기능
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            document.getElementById("checkup-form").style.display = "block";
            document.getElementById("checkup-results").style.display = "none";
        });
    }
});
