function showGuide() {
    const guideModal = document.getElementById('guideModal');
    if (guideModal) {
        guideModal.style.display = 'flex';
        setTimeout(() => {
            guideModal.classList.add('show');
        }, 10);
    }
}

function closeGuide() {
    const guideModal = document.getElementById('guideModal');
    if (guideModal) {
        guideModal.classList.remove('show');
        setTimeout(() => {
            guideModal.style.display = 'none';
        }, 300);
    }
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    const guideModal = document.getElementById('guideModal');
    if (event.target == guideModal) {
        closeGuide();
    }
}
