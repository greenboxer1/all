import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router";
import logo from './assets/logo.png'

function App() {
  // Хук useNavigate из react-router для программной навигации.
  const navigate = useNavigate();

  // Хук useState для хранения списка партнеров. Начальное значение - пустой массив.
  const [partners, setPartners] = useState([]);

  // Хук useEffect для выполнения сайд-эффектов. В данном случае - для загрузки данных при монтировании компонента.
  useEffect(() => {
    // Создаем и немедленно вызываем асинхронную функцию для получения данных.
    (async () => {
      // Вызываем функцию getPartners из API, предоставленного preload-скриптом.
      const res = await window.api.getPartners()
      // Обновляем состояние компонента полученными данными.
      setPartners(res)
    })()
  }, []) // Пустой массив зависимостей означает, что эффект выполнится только один раз.

  return (
    <>
      <div className="page-heading">
        <img className="page-logo" src={logo} alt="" />
        <h1>Партнеры</h1>
      </div>
      <ul className="partners-list">
        {/* Используем метод .map() для отображения каждого партнера из состояния `partners`. */}
        {partners.map((partner) => {
          // `key` должен быть уникальным для каждого элемента в списке, это помогает React эффективно обновлять DOM.
          // При клике на `li` вызывается `navigate` для перехода на страницу редактирования.
          // В `state` передаем объект `partner`, чтобы компонент UpdatePartner мог получить его данные.
          return <li className="partner-card" key={partner.id} onClick={() => { navigate('/update', { state: { partner } }) }}>
            <div className="partner-data">
              <p className="card_heading">{partner.organization_type} | {partner.name}</p>
              <div className="partner-data-info">
                <p>{partner.ceo}</p>
                <p>{partner.phone}</p>
                <p>Рейтинг: {partner.rating}</p>
              </div>
            </div>
            {/* Отображаем вычисленную скидку, полученную из основного процесса. */}
            <div className="partner-sale partner-data card_heading">
              {partner.discount}%
            </div>
          </li>
        })}
      </ul>

      {/* Компонент Link для декларативной навигации на страницу создания партнера. */}
      <Link to={'/create'}>
        <button>
          Создать партнера
        </button>
      </Link>
    </>
  )
}

export default App
