import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Определяем объект `api`, который будет предоставлен renderer-процессу.
// Каждое свойство этого объекта - это функция, которая вызывает соответствующий обработчик в основном процессе
// с помощью `ipcRenderer.invoke`. Это асинхронный способ межпроцессного взаимодействия (IPC).
const api = {
  // Вызывает обработчик 'getPartners' в main/index.js и возвращает результат.
  getPartners: () => ipcRenderer.invoke('getPartners'),
  // Вызывает обработчик 'createPartner', передавая ему объект `partner`.
  createPartner: (partner) => ipcRenderer.invoke('createPartner', partner),
  // Вызывает обработчик 'updatePartner', передавая ему объект `partner`.
  updatePartner: (partner) => ipcRenderer.invoke('updatePartner', partner)
}

// `contextIsolated` - это настройка безопасности в Electron. Если она включена (что является рекомендуемой практикой),
// мы должны использовать `contextBridge` для безопасного предоставления API в renderer-процесс.
if (process.contextIsolated) {
  try {
    // Предоставляем стандартное API Electron.
    contextBridge.exposeInMainWorld('electron', electronAPI)
    // Предоставляем наше кастомное API. Теперь в renderer-процессе мы можем обращаться к `window.api`.
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // Этот блок для старых версий Electron или если `contextIsolated` отключен (не рекомендуется).
  window.electron = electronAPI
  window.api = api
}
