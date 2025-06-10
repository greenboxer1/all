// Импортируем из Electron инструменты для создания безопасного моста.
const { contextBridge, ipcRenderer } = require('electron');

// --- СОЗДАНИЕ API ДЛЯ ФРОНТЕНДА ---
// Мы создаем объект `api`, в котором перечисляем все функции "кухни",
// которые мы хотим разрешить вызывать из "зала".

contextBridge.exposeInMainWorld('api', {
  // Название 'getValue' будет доступно в коде фронтенда как `window.api.getValue()`.
  // Когда его вызовут, `ipcRenderer.invoke('getValue')` отправит команду 'getValue' на бэкенд.
  getValue: () => ipcRenderer.invoke('getValue'),

  // То же самое для записи. Функция принимает один аргумент `newValue`.
  // Этот аргумент будет передан в функцию `setValue` на бэкенде.
  setValue: (newValue) => ipcRenderer.invoke('setValue', newValue)
});
// -----------------------------------
