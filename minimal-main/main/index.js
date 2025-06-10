// Импортируем необходимые модули из Electron.
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

// --- НАША УПРОЩЕННАЯ БАЗА ДАННЫХ ---
// Вместо реальной БД, мы будем хранить данные прямо в переменной.
let myData = 'Начальное значение из "БД"';
// -------------------------------------


// --- ЛОГИКА "КУХНИ" (БЭКЕНД) ---

// 1. Функция, которая "читает" данные. Она просто возвращает значение нашей переменной.
async function getValue() {
  console.log('Бэкенд: Получен запрос на чтение данных.');
  return myData;
}

// 2. Функция, которая "записывает" данные. Она принимает новое значение от фронтенда.
async function setValue(event, newValue) {
  console.log(`Бэкенд: Получен запрос на запись. Новое значение: ${newValue}`);
  myData = newValue; // Обновляем нашу "базу данных".
  dialog.showMessageBox({ message: `Значение успешно сохранено: ${newValue}` }); // Показываем системное сообщение
  return true; // Отвечаем, что все прошло успешно.
}

// --------------------------------


// --- НАСТРОЙКА ПРИЛОЖЕНИЯ ELECTRON ---

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Здесь мы подключаем нашего "официанта" - preload.js
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  // Загружаем в окно наш HTML-файл из папки renderer, который мы создадим далее.
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(() => {
  // Регистрируем наши функции как обработчики команд от фронтенда.
  ipcMain.handle('getValue', getValue);
  ipcMain.handle('setValue', setValue);

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
