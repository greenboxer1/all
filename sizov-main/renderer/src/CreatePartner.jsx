import { useEffect } from "react"
import { Link } from "react-router";

export default function CreatePartner() {
  // Хук useEffect используется для установки заголовка страницы при первом рендере компонента.
  // Пустой массив зависимостей `[]` означает, что эффект выполнится только один раз.
  useEffect(() => { document.title = 'Создать партнера' }, [])

  // Асинхронная функция для обработки отправки формы.
  async function submitHandler(e) {
    // Предотвращает стандартное поведение формы (перезагрузку страницы).
    e.preventDefault()

    // Создание объекта `partner` из значений полей формы.
    // `e.target` ссылается на элемент <form>, а `e.target.<id>` - на поля ввода.
    const partner = {
      type: e.target.type.value,
      name: e.target.name.value,
      ceo: e.target.ceo.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      rating: e.target.rating.value
    }
    // Вызов функции `createPartner` из API, доступного через `window.api` (определено в preload-скрипте).
    // Эта функция отправляет данные партнера в основной процесс Electron для сохранения в базе данных.
    await window.api.createPartner(partner);

    // Очистка полей формы после успешной отправки.
    document.querySelector('form').reset()
  }

  // JSX-разметка компонента.
  return <div className="form">
    {/* Компонент Link из react-router для навигации на главную страницу. */}
    <Link to={'/'}><button>{"<-- Назад"}</button></Link>
    
    <h1>Создать партнера</h1>
    {/* Форма для создания нового партнера. При отправке вызывается `submitHandler`. */}
    <form onSubmit={(e) => submitHandler(e)}>
      <label htmlFor="name">Наименование:</label>
      <input id="name" type="text" required />
      
      <label htmlFor="type">Тип партнера:</label>
      <select name="" id="type" required>
        <option value="ЗАО">ЗАО</option>
        <option value="ООО">ООО</option>
        <option value="ОАО">ОАО</option>
        <option value="ПАО">ПАО</option>
      </select>
      
      <label htmlFor="rating">Рейтинг:</label>
      <input id="rating" type="number" step="1" min='0' max='100' required />
      
      <label htmlFor="address">Адрес:</label>
      <input id="address" type="text" required />
      
      <label htmlFor="ceo">ФИО директора:</label>
      <input id="ceo" type="text" required />
      
      <label htmlFor="phone">Телефон:</label>
      <input id="phone" type="tel" required />
      
      <label htmlFor="email">Email компании:</label>
      <input id="email" type="email" required />
      
      {/* Кнопка для отправки формы. */}
      <button type="submit">Создать партнера</button>
    </form>
  </div>
}