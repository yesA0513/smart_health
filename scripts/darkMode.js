// 시스템 다크모드 감지 및 적용
function applySystemTheme() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 테마 변경 함수
    function updateTheme(e) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    // 초기 테마 적용
    updateTheme(darkModeMediaQuery);
    
    // 시스템 테마 변경 감지
    darkModeMediaQuery.addListener(updateTheme);  // 이전 버전 브라우저 지원
    try {
        darkModeMediaQuery.addEventListener('change', updateTheme);  // 최신 브라우저
    } catch (e1) {
        try {
            darkModeMediaQuery.addListener(updateTheme);  // 이전 버전 브라우저
        } catch (e2) {
            console.error('다크모드 감지를 지원하지 않는 브라우저입니다.');
        }
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', applySystemTheme); 