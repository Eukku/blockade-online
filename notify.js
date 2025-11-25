Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        console.log('Разрешение на уведомления получено.');
    } else {
        console.log('Не удалось получить разрешение на уведомления.');
    }
});

const notificationOptions = {
    body: "Супер! Вы включили уведомления!\nТеперь вы всегда будете в курсе вашей карты!.",
    icon: ""
};

new Notification("Проверка доступа к уведомлениям", notificationOptions);


const mapIshunt = {
    body: "Ваша карта найдена!\n Теперь вы можете поиграть на ней.",
    icon: ""
};





let intervalId; // Переменная для хранения ID интервала

// Функция для получения и вывода названий карт и проверки совпадений
function getMaps() {
    // Получаем элемент с классом allmapstonotify
    const notifyElement = document.querySelector('.allmapstonotify');

    // Проверяем, существует ли элемент
    if (notifyElement) {
        // Получаем текстовое содержимое элемента
        const mapsText = notifyElement.textContent.trim(); // Убираем лишние пробелы

        // Разделяем текст на массив по символу '|'
        const mapsArray = mapsText.split('|').map(map => map.trim().toLowerCase()).filter(map => map.length > 0); // Убираем лишние пробелы и пустые строки, переводим в нижний регистр

        // Получаем текст из текстового поля с айди wait_map
        const waitMapInput = document.getElementById('wait_map');
        const inputMapName = waitMapInput.value.trim().toLowerCase(); // Получаем значение из input и переводим в нижний регистр

        // Проверяем, есть ли название карты из текстового поля в массиве
        if (mapsArray.includes(inputMapName)) {
            new Notification("Ура!", mapIshunt);

            clearInterval(intervalId); // Останавливаем таймер
            intervalId = null; // Сбрасываем ID интервала
        } else {
            console.log(`Карта "${inputMapName}" не найдена в списке.`);
        }

        // Выводим массив в консоль (по желанию)
        console.log(mapsArray);
    } else {
        console.log('Элемент с классом allmapstonotify не найден.');
    }
}

// Функция для проверки состояния чекбокса и запуска/остановки таймера
function checkUvedButton() {
    const uvedButton = document.getElementById('uvedButton'); // Получаем чекбокс

    if (uvedButton.checked) {
        alert('Не забудьте разрешить уведомления для данной страницы! Чаще всего в конце адресной строки браузера есть кнопка.\nИ ещё важное напоминание.\n1) Работает только на Пк.\n2) Страница должна быть открыта (вы можете продолжать работать на другой)'); // Показываем алерт с напоминанием
        // Если чекбокс активирован, запускаем таймер
        if (!intervalId) { // Проверяем, не запущен ли уже таймер
            intervalId = setInterval(getMaps, 2500);
        }
    } else {
        // Если чекбокс не активирован, останавливаем таймер
        clearInterval(intervalId);
        intervalId = null; // Сбрасываем ID интервала
    }
}

// Добавляем обработчик события на чекбокс
document.getElementById('uvedButton').addEventListener('change', checkUvedButton);


