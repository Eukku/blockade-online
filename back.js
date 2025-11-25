const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

// Установка размеров канваса на всю видимую часть страницы
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Устанавливаем размеры при загрузке

let circles = [];

// Функция для создания кругов
// Функция для создания кругов
function createCircles() {
    circles = []; // Очищаем массив кругов
    for (let i = 0; i < numCircles; i++) {
        const radius = Math.random() * (maxRadius - minRadius) + minRadius; // Размер от minRadius до maxRadius
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const alpha = minAlpha + (radius - minRadius) / (maxRadius - minRadius) * (maxAlpha - minAlpha); // Прозрачность зависит от радиуса
        
        // Умножаем скорость на speed_multy
        const vx = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * speed_multy * (Math.random() < 0.5 ? 1 : -1); // случайное направление по x
        const vy = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * speed_multy * (Math.random() < 0.5 ? 1 : -1); // случайное направление по y
        
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
    numCircles = parseInt(event.target.value); // Получаем новое количество кругов
    createCircles(); // Создаем новые круги
});

// Обработчик изменения значения инпута для скорости
const speedMultiInput = document.getElementById('balls_speed');
speedMultiInput.addEventListener('input', (event) => {
    speed_multy = parseFloat(event.target.value); // Получаем новое значение скорости
    createCircles(); // Создаем новые круги с обновленной скоростью
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
    // Предотвращаем стандартное поведение (например, прокрутку)
    event.preventDefault();

    // Получаем координаты первого касания
    const touch = event.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;

});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем область, которую "боятся" шарики
    //ctx.strokeStyle = "blue"; // Цвет области
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, escapeRadius, 0, Math.PI * 2);
    //ctx.stroke();

    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + c_a_red + ", " + c_a_green + ", " + c_a_blue + ", " + circle.alpha + ")"; // Цвет кружка с прозрачностью
        ctx.fill();
        ctx.closePath();

        // Обновляем позицию шарика
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Проверяем, не выходит ли шарик за границы экрана
        if (circle.x < 0 || circle.x > canvas.width) {
            circle.vx = -circle.vx; // меняем направление по x
            circle.x = Math.max(0, Math.min(circle.x, canvas.width)); // сохраняем x в пределах границ
        }
        if (circle.y < 0 || circle.y > canvas.height) {
            circle.vy = -circle.vy; // меняем направление по y
            circle.y = Math.max(0, Math.min(circle.y, canvas.height)); // сохраняем y в пределах границ
        }

        // Проверяем столкновение с областью вокруг мышки
        const dx = circle.x - mouse.x;
        const dy = circle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < escapeRadius + circle.radius) {
            // Меняем направление шарика
            circle.vx = -circle.vx;
            circle.vy = -circle.vy;

            // Перемещаем шарик за пределы радиуса, чтобы избежать застревания
            const overlap = escapeRadius + circle.radius - distance;
            circle.x += (dx / distance) * overlap;
            circle.y += (dy / distance) * overlap;
        }
    });

    requestAnimationFrame(draw); // Запускаем следующий кадр
}

draw(); // Начинаем анимацию