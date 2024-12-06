function showGuide() {
    const modal = document.getElementById('guideModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeGuide() {
    const modal = document.getElementById('guideModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

document.getElementById('guideModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeGuide();
    }
});
