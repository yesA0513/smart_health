function toggleHighContrast() {
    const body = document.body;
    body.classList.toggle('high-contrast');
    
    // 설정 저장
    const isHighContrast = body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
    
    // 버튼 텍스트 변경
    const contrastButton = document.querySelector('.controls__item:nth-child(2)');
    contrastButton.innerHTML = `
        <i class="fas fa-adjust"></i>
        ${isHighContrast ? '일반 모드' : '고대비'}
    `;
}

// 페이지 로드 시 저장된 설정 적용
document.addEventListener('DOMContentLoaded', () => {
    const isHighContrast = localStorage.getItem('highContrast') === 'true';
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
        const contrastButton = document.querySelector('.controls__item:nth-child(2)');
        contrastButton.innerHTML = `
            <i class="fas fa-adjust"></i>
            일반 모드
        `;
    }
}); 