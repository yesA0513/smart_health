// 로컬 스토리지에서 고대비 모드 상태 확인
let isHighContrast = localStorage.getItem('highContrast') === 'true';

// 페이지 로드 시 고대비 모드 상태 적용
document.addEventListener('DOMContentLoaded', function() {
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
    }
});

// 고대비 모드 토글 함수
function toggleHighContrast() {
    isHighContrast = !isHighContrast;
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
} 