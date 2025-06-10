// Импортируем глобальные стили для приложения.
import './styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Импортируем компоненты из react-router-dom для настройки маршрутизации.
import { Routes, Route, HashRouter } from 'react-router'

// Импортируем компоненты-страницы нашего приложения.
import App from './App.jsx' // Главная страница со списком партнеров.
import UpdatePartner from './UpdatePartner.jsx' // Страница для редактирования партнера.
import CreatePartner from './CreatePartner.jsx' // Страница для создания нового партнера.

// Находим корневой DOM-элемент и создаем в нем корень для рендеринга React-приложения.
createRoot(document.getElementById('root')).render(
  // Оборачиваем все приложение в HashRouter.
  // HashRouter использует хэш в URL (например, index.html#/create) для отслеживания маршрута.
  // Это надежный способ для клиентской маршрутизации в Electron-приложениях.
  <HashRouter>
    <StrictMode>
      {/* Компонент Routes действует как контейнер для всех маршрутов. */}
      <Routes>
        {/* Определяем каждый маршрут с помощью компонента Route. */}
        {/* path='/' - это корневой маршрут, он будет отображать компонент App. */}
        <Route path='/' element={<App/>}/>
        {/* path='/update' отображает компонент для обновления партнера. */}
        <Route path='/update' element={<UpdatePartner/>}/>
        {/* path='/create' отображает компонент для создания партнера. */}
        <Route path='/create' element={<CreatePartner/>}/>
      </Routes>
    </StrictMode>
  </HashRouter>
)
