const mapsData = {
    "0": {
        "2": "Замок",
        "3": "Форпост 2",
        "10": "Форпост 3",
        "12": "Энергетик",
        "14": "Острова 2017",
        "18": "Зимний лес",
        "19": "Общежитие",
        "20": "Зимний замок",
        "21": "Порт",
        "24": "Япония",
        "25": "Подземка",
        "26": "Секретная база",
        "27": "Канализация",
		"29": "Техно",
        "31": "Водоворот",
        "32": "Сибирь",
        "35": "Бункер",
        "36": "Арена 26",
        "38": "Убежище",
		"39": "Оплот",
        "42": "Марс",
        "44": "Зимний рубеж",
        "45": "Заброшенный замок",
        "47": "Бресткая крепость"
    },
    "3": {
        "01": "Деревня-Z 2",
        "02": "Дом",
        "03": "Лабиринт",
        "04": "Мельница",
        "05": "Ракета",
        "07": "Госпиталь",
        "08": "Психушка",
        "09": "Кровавая долина",
        "10": "Тихое место",
        "11": "Лаборатория",
        "12": "Карьер",
        "13": "Бункер"
    },
    "5": {
        "01": "Даст2",
        "03": "Трейн",
        "05": "Нюк",
        "07": "Кланмилл",
        "12": "Даст 2002",
        "14": "Бассейн",
        "15": "Перекрёсток",
        "18": "Станция",
        "19": "Пыль",
        "20": "Моно",
        "24": "Квартал",
        "25": "Индия",
        "26": "Минидаст2",
        "27": "Кобл",
        "28": "Рэд",
        "29": "Ацтериал",
        "31": "Склады",
        "34": "Элдери",
        "35": "Ассаулт",
        "37": "Даст2 СМ",
        "39": "Ангар",
        "40": "Руины",
        "43": "Трейн СМ",
        "46": "Мидтаун",
        "48": "Нюк",
        "49": "Моно2",
        "55": "Итали",
        "57": "Х-Станция",
        "58": "Башни",
		"59": "Развалины",
        "60": "Промтаун",
        "61": "Окопы",
        "65": "Вокзал",
		"66": "Куба",
        "68": "Грань",
        "69": "Берлин",
        "72": "Река"
    },
    "6": {
        "01": "Стайл",
        "03": "Арена 35",
        "04": "Миниацтек",
        "07": "Маска",
        "10": "Два моста",
		"17": "Снежный город",
        "19": "Вафельница",
        "21": "Меншен",
        "22": "Минидаст",
        "23": "Бассейн",
		"24": "Перекрёсток",
        "26": "Пыль",
        "27": "Лаборатория",
        "31": "Оверлорд",
        "32": "Платформы"
    },
    "14": {
        "01": "Пасфайнд",  
        "03": "Ангар",
        "04": "Высотка",
        "07": "Дюссельдорф",
        "08": "Арабика",
        "09": "Звездолёт",
        "13": "Дайр"
    },
    "15": {}
};

// Режимы игры
const gameModes = {
    "0": "Битва",
    "1": "Особые карты",
    "2": "Стройка",
    "3": "Зомби",
    "5": "Контра",
    "6": "Резня",
    "14": "Гангейм",
    "15": "Режим 15"
};

// Получение названия карты
function getMapName(mode, mapId) {
    if (mapsData[mode]) {
        // Пробуем найти полный ID
        if (mapsData[mode][mapId]) {
            return mapsData[mode][mapId];
        }
        
        // Пробуем найти короткий ID
        const shortId = mapId.length >= 2 ? mapId.slice(-2) : mapId;
        if (mapsData[mode][shortId]) {
            return mapsData[mode][shortId];
        }
    }
    return mapId;
}

// Получение индикатора заполненности
function getPlayerIndicator(players) {
    if (players >= 25) return '<span class="indicator high"></span>';
    if (players >= 16) return '<span class="indicator medium"></span>';
    if (players >= 6) return '<span class="indicator low"></span>';
    return '<span class="indicator very-low"></span>';
}

// Показ ошибки
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Автоматически скрыть через 5 секунд
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Скрытие ошибки
function hideError() {
    document.getElementById('error').style.display = 'none';
}

// Загрузка данных с серверов
async function loadServers() {
    const loading = document.getElementById('loading');
    const serversList = document.getElementById('serversList');
    const stats = document.getElementById('stats');
    
    // Показываем загрузку
    loading.style.display = 'block';
    serversList.style.display = 'none';
    stats.innerHTML = '';
    hideError();
    
    try {
        // URL API Blockade 3D
        const url = "https://blockade3d.com/api_classic/servers/handler.php";
        const params = new URLSearchParams({
            'NETWORK': 1,
            'CMD': 4,
            'time': 11,
            'LVL': 100
        });
        
        const response = await fetch(`${url}?${params}`, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://blockade3d.com/game_vk_v6.php'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        const data = await response.text();
        processServerData(data);
        
    } catch (error) {
        console.error('Ошибка:', error);
        showError(`Ошибка загрузки: ${error.message}`);
        loading.style.display = 'none';
    }
}

// Обработка данных серверов
function processServerData(data) {
    const loading = document.getElementById('loading');
    const serversList = document.getElementById('serversList');
    const stats = document.getElementById('stats');
    
    // Скрываем загрузку
    loading.style.display = 'none';
    
    if (!data || data.trim() === '') {
        showError('Не удалось получить данные с серверов');
        return;
    }
    
    const servers = [];
    let totalPlayers = 0;
    let serversWithPlayers = 0;
    
    // Парсим данные
    const serverStrings = data.split('^').filter(str => str.trim());
    
    serverStrings.forEach(serverStr => {
        const fields = serverStr.split('|');
        
        if (fields.length >= 11) {
            const mode = fields[1];
            const currentPlayers = parseInt(fields[4]);
            const maxPlayers = parseInt(fields[5]);
            const mapId = fields[6];
            
            // Пропускаем пустые серверы
            if (currentPlayers === 0) return;
            
            const modeName = gameModes[mode] || `Режим ${mode}`;
            const mapName = getMapName(mode, mapId);
            
            servers.push({
                mode: mode,
                modeName: modeName,
                currentPlayers: currentPlayers,
                maxPlayers: maxPlayers,
                mapId: mapId,
                mapName: mapName,
                address: `${fields[2]}:${fields[3]}`
            });
            
            totalPlayers += currentPlayers;
            serversWithPlayers++;
        }
    });
    
    // Сортируем по убыванию онлайна
    servers.sort((a, b) => b.currentPlayers - a.currentPlayers);
    
    // Отображаем серверы
    displayServers(servers);
    
    // Показываем статистику
    stats.innerHTML = `
        <div>Всего игроков онлайн: <strong>${totalPlayers}</strong></div>
        <div>Активных серверов: <strong>${serversWithPlayers}</strong></div>
        <div>Обновлено: <strong>${new Date().toLocaleTimeString()}</strong></div>
    `;
    
    serversList.style.display = 'block';
}

// Отображение списка серверов
function displayServers(servers) {
    const serversList = document.getElementById('serversList');
    
    if (servers.length === 0) {
        serversList.innerHTML = '<div class="loading">Нет активных серверов в данный момент</div>';
        return;
    }
    
    let html = '';
    
    servers.forEach(server => {
        const indicator = getPlayerIndicator(server.currentPlayers);
        
        html += `
            <div class="server-item">
                <div class="server-header">
                    <div class="server-mode">${indicator} ${server.modeName}</div>
                    <div class="server-players">${server.currentPlayers}/${server.maxPlayers}</div>
                </div>
                <div class="server-map">${server.mapName}</div>
            </div>
        `;
    });
    
    serversList.innerHTML = html;
}

// Показ информации о проекте
function showInfo() {
    alert(`Blockade 3D Online Monitor\n\n` +
          `Этот сайт показывает онлайн на серверах Blockade 3D в реальном времени.\n\n` +
          `Все данные загружаются напрямую с официальных серверов игры.\n` +
          `Код выполняется в вашем браузере - никакие данные не сохраняются на сторонних серверах.\n\n` +
          `Для обновления данных нажмите кнопку "Обновить онлайн"`);
}

// Автоматическое обновление каждые 2 минуты
setInterval(loadServers, 120000);

// Загружаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Даем пользователю самому запустить обновление при первом посещении
    console.log('Blockade 3D Online Monitor загружен');
});