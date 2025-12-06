const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Настройки для кнопки настроек
document.addEventListener('DOMContentLoaded', function() {
    const settingsButton = document.getElementById('settingsButton');
    const settingsPanel = document.querySelector('.Settings_Panel');

    settingsButton.addEventListener('click', function() {
        settingsPanel.classList.toggle('Settings_Panel_viwy');
    });
});

// Настройки фона
let numCircles = 60; // Количество кругов
const minRadius = 2; // Минимальный радиус
const maxRadius = 8; // Максимальный радиус
const minAlpha = 0.1; // Минимальная прозрачность
const maxAlpha = 1; // Максимальная прозрачность
const minSpeed = 0.1; // Минимальная скорость
const maxSpeed = 1.2; // Максимальная скорость
let speed_multy = 1; // Ускорение постоянное
const c_a_red = "255"; // Доля красного цвета
const c_a_green = "255"; // Доля зелёного цвета
const c_a_blue = "255"; // Доля синего цвета
const escapeRadius = 100; // радиус, в пределах которого шарики будут убегать

// Настройки градиента и текста
const gradientColors = [
    '#667eea', // Синий
    '#764ba2', // Фиолетовый
    '#f093fb', // Розовый
    '#f5576c'  // Красный
];

const backgroundText = "OHS - ДОЛБАЁБ";
const textColor = 'rgba(255, 255, 255, 0.25)'; // Цвет текста

// Установка размеров канваса на всю видимую часть страницы
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Устанавливаем размеры при загрузке

let circles = [];

// Функция для создания градиентного фона
function createGradientBackground() {
    // Создаем градиент от одного угла к другому
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    // Добавляем цвета градиента
    gradient.addColorStop(0, gradientColors[0]);
    gradient.addColorStop(0.4, gradientColors[1]);
    gradient.addColorStop(0.7, gradientColors[2]);
    gradient.addColorStop(1, gradientColors[3]);
    
    // Заливаем фон градиентом
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Функция для рисования фонового текста
function drawBackgroundText() {
    ctx.save();
    
    // Основной текст
    ctx.fillStyle = textColor;
    ctx.font = 'bold 120px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Рисуем текст по центру
    ctx.fillText(backgroundText, canvas.width / 2, canvas.height / 2);
    
    // Дополнительный текст поменьше
    ctx.font = 'bold 40px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillText('сделал самый умный Женечка', canvas.width / 2, canvas.height / 2 + 80);
    
    ctx.restore();
}

// Функция для создания кругов
function createCircles() {
    circles = []; // Очищаем массив кругов
    for (let i = 0; i < numCircles; i++) {
        const radius = Math.random() * (maxRadius - minRadius) + minRadius;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const alpha = minAlpha + (radius - minRadius) / (maxRadius - minRadius) * (maxAlpha - minAlpha);
        
        // Умножаем скорость на speed_multy
        const vx = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * speed_multy * (Math.random() < 0.5 ? 1 : -1);
        const vy = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * speed_multy * (Math.random() < 0.5 ? 1 : -1);
        
        circles.push({
            x,
            y,
            radius,
            alpha,
            vx,
            vy,
        });
    }
}

// Инициализация кругов
createCircles();

// Обработчик изменения значения инпута
const ringMoreInput = document.getElementById('ring_more');
ringMoreInput.addEventListener('input', (event) => {
    numCircles = parseInt(event.target.value);
    createCircles();
});

// Обработчик изменения значения инпута для скорости
const speedMultiInput = document.getElementById('balls_speed');
speedMultiInput.addEventListener('input', (event) => {
    speed_multy = parseFloat(event.target.value);
    createCircles();
});

const mouse = {
    x: 0,
    y: 0
};

// Обработчик события для движения мыши
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Обработчик события для касания пальцем
window.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
});

function draw() {
    // Сначала рисуем градиентный фон
    createGradientBackground();
    
    // Затем рисуем фоновый текст
    drawBackgroundText();
    
    // Затем рисуем круги
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + c_a_red + ", " + c_a_green + ", " + c_a_blue + ", " + circle.alpha + ")";
        ctx.fill();
        ctx.closePath();

        // Обновляем позицию шарика
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Проверяем, не выходит ли шарик за границы экрана
        if (circle.x < 0 || circle.x > canvas.width) {
            circle.vx = -circle.vx;
            circle.x = Math.max(0, Math.min(circle.x, canvas.width));
        }
        if (circle.y < 0 || circle.y > canvas.height) {
            circle.vy = -circle.vy;
            circle.y = Math.max(0, Math.min(circle.y, canvas.height));
        }

        // Проверяем столкновение с областью вокруг мышки
        const dx = circle.x - mouse.x;
        const dy = circle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < escapeRadius + circle.radius) {
            circle.vx = -circle.vx;
            circle.vy = -circle.vy;

            const overlap = escapeRadius + circle.radius - distance;
            circle.x += (dx / distance) * overlap;
            circle.y += (dy / distance) * overlap;
        }
    });

    requestAnimationFrame(draw);
}

// Начинаем анимацию
draw();