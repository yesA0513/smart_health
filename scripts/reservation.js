document.addEventListener("DOMContentLoaded", () => {
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const step3 = document.getElementById("step-3");

    const serviceButtons = document.querySelectorAll(".service-button");
    const backToStep1 = document.getElementById("back-to-step-1");
    const nextToStep3 = document.getElementById("next-to-step-3");
    const backToStep2 = document.getElementById("back-to-step-2");
    const submitButton = document.getElementById("submit");

    const timeSlots = document.querySelectorAll(".time-slot"); // 시간 슬롯 버튼
    let selectedService = null;
    let selectedDate = null;
    let selectedTime = null;

    // Step 1: 서비스 선택
    serviceButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedService = button.dataset.service;
            step1.classList.remove("active");
            step2.classList.add("active");
        });
    });

    // Step 2: 날짜와 시간 선택
    backToStep1.addEventListener("click", () => {
        step2.classList.remove("active");
        step1.classList.add("active");
    });

    nextToStep3.addEventListener("click", () => {
        selectedDate = document.getElementById("date").value;

        // 날짜와 시간이 선택되었는지 확인
        if (!selectedDate || !selectedTime) {
            alert("날짜와 시간을 선택해 주세요.");
            return;
        }

        step2.classList.remove("active");
        step3.classList.add("active");
    });

    // 시간 슬롯 선택 시 배경색 변경
    timeSlots.forEach(slot => {
        slot.addEventListener("click", () => {
            // 이전에 선택된 슬롯에서 'selected' 클래스 제거
            timeSlots.forEach(s => s.classList.remove("selected"));

            // 클릭한 슬롯에 'selected' 클래스 추가
            slot.classList.add("selected");

            // 선택된 시간 저장
            selectedTime = slot.textContent.trim();
        });
    });

    // Step 3: 예약자 정보 입력
    backToStep2.addEventListener("click", () => {
        step3.classList.remove("active");
        step2.classList.add("active");
    });

    submitButton.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const birthday = document.getElementById("birthday").value;

        // 이름과 전화번호 입력 확인
        if (!name || !phone || !birthday) {
            alert("정보를 입력해 주세요.");
            return;
        }

        // 예약 정보 출력
        alert(`예약이 완료되었습니다.\n서비스: ${selectedService}\n날짜: ${selectedDate}\n시간: ${selectedTime}\n이름: ${name}\n전화번호: ${phone}`);
    });
});
