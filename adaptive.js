function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    document.getElementById('main_css').href = 'mobil.css';
} else {
    document.getElementById('main_css').href = 'style.css';
}

function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        document.getElementById('main_css').href = 'mobil.css';
    } else {
        document.getElementById('main_css').href = 'style.css';
    }
}

// Проверяем ориентацию при загрузке страницы
checkOrientation();

// Отслеживаем изменения размера окна
window.addEventListener('resize', checkOrientation);
window.addEventListener('resize', isMobileDevice);