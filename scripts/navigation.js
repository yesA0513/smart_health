// 홈으로 이동하는 함수
function goToHome() {
    // localStorage에서 지정된 경로 가져오기
    const storagePath = document.querySelector('meta[name="localStorage-path"]')?.content || '/';
    const homePath = storagePath + 'main.html';
    
    // 페이지 이동 전에 부드러운 전환 효과
    document.querySelector('.content-wrapper').style.opacity = '0';
    
    // 약간의 지연 후 페이지 이동
    setTimeout(() => {
        window.location.href = homePath;
    }, 300);
} 