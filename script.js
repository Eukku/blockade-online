function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://blockade3d.com/api_classic/servers/handler.php?NETWORK=1&CMD=4&time=1', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            handleResponse(xhr.responseText);
            startTimer(5); // Запускаем таймер на 5 секунд
        } else if (xhr.readyState === 4) {
            console.error('Error:', xhr.statusText);
        }
    };

    xhr.send();
}
const allmapstonotify = document.querySelector('.allmapstonotify');

function startTimer2(seconds) {
    const timerElement = document.querySelector('.deley_timer');
    let countdown = seconds;

    const interval = setInterval(() => {
        timerElement.textContent = countdown;
        countdown--;

        if (countdown < 0) {
            clearInterval(interval);
            timerElement.textContent = 'Получение данных...';
            fetchData(); // Запускаем новый запрос данных
        }
    }, 1000);
}

function handleResponse(responseText) {
    // Разделяем текст по символу '^'
    const lines = responseText.split('^');
    // Удаляем лишние пробелы и фильтруем пустые строки
    const filteredLines = lines.map(line => line.trim()).filter(line => line.length > 0);

    // Преобразуем каждую строку в массив подстрок, разделенных символом '|'
    const multiDimensionalArray = filteredLines.map(line => line.split('|'));
    //console.log('Массив до удаления 2-го и 10-го элемента:', multiDimensionalArray);
    // Удаляем 2-й и 10-й элементы из каждого подмассива
    const modifiedArray = multiDimensionalArray.map(arr => {
        return arr.filter((_, index) => index !== 2 && index !== 10 && index !== 9 && index !== 8 && index !== 7);
    });



    // Создаем массив объектов с заданными ключами
    const keys = ["st1", "Режим", "st232", "кол-игроков", "Макс. игроков", "Айди или ник"];
    const jsonOutput = modifiedArray.map(arr => {
        const namedObject = {};
        arr.forEach((value, index) => {
            if (index < keys.length) { // Убедимся, что индекс не выходит за пределы массива ключей
                namedObject[keys[index]] = value; // Присваиваем значения по ключам
            }
        });
        return namedObject; // Возвращаем объект для каждой строки
    });
    //console.table(jsonOutput);
    const filteredOutput = jsonOutput.filter(obj => obj["кол-игроков"] !== "0");

    // Заменяем значения в графе "Режим"
    const modeMapping = {
        '2': "Стройка",
        '5': "Контра",
        '0': "Битва",
        '3': "Зомби",
        '14': "Гангейм",
        '6': "Резня",
        '7': "Выживание"
    };
    // Заменяем значения в графе "Айди или ник"
    const mapMapping = {
    '1' : "Цитадель",
    '2' : "Замок",
    '3' : "Форпост 2",
    '4' : "Осада",
    '5' : "Деревня 2",
    '6' : "Острова",
    '7' : "Собор 2",
    '8' : "Город",
    '9' : "Слизняк",
    '10' : "Форпост 3",
    '11' : "Припять",
    '12' : "Энергетик",
    '13' : "Клазмос",
    '14' : "Острова 2017",
    '15' : "Эпик",
    '16' : "Башни",
    '17' : "Пристань",
    '18' : "Зимний лес", // Обновлено с "Зимний сад"
    '19' : "Общежитие",
    '20' : "Зимний замок",
    '21' : "Порт",
    '22' : "Крепость",
    '23' : "Вышка",
    '24' : "Япония",
    '25' : "Подземка",
    '26' : "Секретная база",
    '27' : "Канализация",
	'29' : "Техно",
    '31' : "Водоворот", // Добавлено
    '32' : "Сибирь", // Добавлено
    '35' : "Бункер", // Добавлено
    '36' : "Арена 26", // Добавлено
	'37' : "Депо",
    '38' : "Убежище", // Добавлено
	'39' : "Оплот",
    '42' : "Марс", // Добавлено
    '44' : "Зимний рубеж", // Добавлено
    '45' : "Заброшенный замок", // Добавлено
    '47' : "Бресткая крепость", // Добавлено
    '301' : "Деревня-Z 2",
    '302' : "Дом",
    '303' : "Лабиринт", // Добавлено
    '304' : "Мельница",
    '305' : "Ракета",
    '306' : "Кладбище",
    '307' : "Госпиталь",
    '308' : "Психушка",
    '309' : "Кровавая долина",
    '310' : "Тихое место",
    '311' : "Лаборатория",
    '312' : "Карьер",
    '313' : "Бункер",
    '501' : "Даст 2",
    '502' : "Инферно",
    '503' : "Трейн",
    '504' : "Ацтек",
    '505' : "Нюк",
    '506' : "ОФИС",
    '507' : "Кланмил",
    '508' : "Даст 1",
    '509' : "Меншен",
    '510' : "Флай 2",
    '511' : "Ацтеки",
    '512' : "Даст 2002",
    '513' : "Минидаст",
    '514' : "Бассейн",
    '515' : "Перекрёсток",
    '516' : "Кэш",
    '517' : "База в пустыне",
    '518' : "Станция",
    '519' : "Пыль",
    '520' : "Моно",
    '521' : "Муравейник",
    '522' : "Убежище 2",
    '523' : "Лаборатория",
    '524' : "Квартал",
    '525' : "Индия",
    '526' : "Минидаст 2",
    '527' : "Кобл",
    '528' : "Рэд",
    '529' : "Ацтериал",
    '530' : "Фабрика",
    '531' : "Склады",
    '532' : "Асцент",
    '533' : "КБН",
    '534' : "Элдери",
    '535' : "Ассаулт",
    '536' : "Пригород",
    '537' : "Даст 2 СМ",
    '538' : "Шторм",
    '539' : "Ангар",
    '540' : "Руины",
    '541' : "Закаулок",
    '542' : "Мираж",
    '543' : "Трейн СМ",
    '544' : "Турнирная контра",
    '545' : "Трущобы",
    '546' : "Мидтаун",
    '547' : "Милитех",
    '548' : "Нюк 2",
    '549' : "Моно 2",
    '550' : "Бассейн 2",
    '551' : "Меншен 2",
    '552' : "Берн",
    '553' : "Оазис",
    '554' : "Санаторий",
	'555' : "Итали",
	
    '557' : "Х-Станция", // Добавлено
    '558' : "Башни", // Добавлено
    '560' : "Промтаун", // Добавлено
    '561' : "Окопы", // Добавлено
	'562' : "Тренировочная",
    '565' : "Вокзал", // Добавлено
	'566' : "Куба",
    '568' : "Грань", // Добавлено
    '569' : "Берлин", // Добавлено
    '571' : "Станция 2", // Добавлено
    '572' : "Река", // Добавлено
    '601' : "Стайл",
    '602' : "Арена 50",
    '603' : "Арена 35",
    '604' : "Миниацтек",
    '605' : "Корабль",
    '606' : "Напрямик",
    '607' : "Маска", // Обновлено с "Безумие"
    '608' : "Эпицентр",
    '610' : "Два моста", // Обновлено с "2 моста"
    '611' : "Празднество",
    '613' : "Маска",
    '614' : "Праздничная комната",
    '615' : "Праздничное настроение",
    '616' : "Кубы",
	'617': "Снежный город",
    '618' : "Мост",
    '619' : "Вафельница",
    '621' : "Меншен",
    '622' : "Минидаст", // Добавлено
    '623' : "Бассейн",
    '624' : "Перекрёсток",
    '626' : "Пыль", // Добавлено
    '627' : "Лаборатория", // Добавлено
    '628' : "Индия",
    '630' : "Склады",
    '631' : "Оверлорд",
    '632' : "Платформы", // Добавлено
    '633' : "Стилпоинт",
    '701' : "Пляж",
    '702' : "Оборона",
    '704' : "Селение",
    '705' : "Форт",
    '707' : "Заброшенный город",
    '708' : "Гиблый хутор",
    '709' : "Оборона 2",
    '710' : "Шапито",
    '711' : "Магистраль",
    '712' : "Нашествие",
    '713' : "Заправка",
    '1401' : "Пасфайнд",
    '1402' : "Скретч",
    '1403' : "Ангар",
    '1404' : "Высотка",
    '1405' : "Перекрёсток 2",
    '1406' : "Хоринесс",
    '1407' : "Дюссельдорф",
    '1408' : "Арабика",
    '1409' : "Звездолёт",
    '1410' : "Австрия",
    '1411' : "Индастриал",
    '1412' : "Церковь",
    '1413' : "Дайр"
};

    filteredOutput.forEach(obj => {
        if (modeMapping[obj["Режим"]] !== undefined) {
            obj["Режим"] = modeMapping[obj["Режим"]];
        }
    });
    filteredOutput.forEach(obj => {
        if (mapMapping[obj["Айди или ник"]] !== undefined) {
            obj["Айди или ник"] = mapMapping[obj["Айди или ник"]];
        }
    });

    allmapstonotify.innerHTML = '';




    // Преобразуем массив объектов в формат JSON
    const finalJsonOutput = JSON.stringify(filteredOutput, null, 2); // Преобразуем в JSON с отступами для удобочитаемости

    //console.log(finalJsonOutput); // Выводим JSON-строку

    // Вставляем JSON в тело страницы
    const contentElement = document.querySelector('.content'); // Ищем элемент с классом content
    contentElement.innerHTML = ''; // Очищаем контейнер перед добавлением новых карточек

    // Проходим по каждому объекту в массиве jsonDataArray
    const jsonDataArray = JSON.parse(finalJsonOutput);
    jsonDataArray.forEach(jsonData => {
        // Получаем элемент с классом 'card'
        const originalCard = document.querySelector('.card');

        // Клонируем элемент (true - для глубокого клонирования, включая дочерние элементы)
        const clonedCard = originalCard.cloneNode(true);

        // Находим элемент h1 в клонированной карточке
        const pElement = clonedCard.querySelector('.p');
        const spanElement = clonedCard.querySelector('.span');
        const hElement = clonedCard.querySelector('.h1');

        // Устанавливаем значение из JSON в элемент h1
        hElement.textContent = jsonData["Айди или ник"];
        pElement.textContent = jsonData["Режим"];
        spanElement.textContent = jsonData["кол-игроков"] + " / " + jsonData["Макс. игроков"];

        // Вставляем клонированную карточку в элемент с классом 'content'
        contentElement.appendChild(clonedCard);
        allmapstonotify.textContent = allmapstonotify.textContent + jsonData["Айди или ник"] + "|";
    });
    const cards = document.querySelectorAll('.card');
    const pointer = document.getElementById('pointer');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            pointer.style.width = '0px';
            pointer.style.height = '0px';
        });

        card.addEventListener('mouseleave', () => {
            pointer.style.width = '2vw'; // Вернуть к исходным размерам
            pointer.style.height = '2vw';
        });
    });
}

// Запускаем первый запрос данных при загрузке страницы

fetchData();


