import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router";

export default function UpdatePartner() {
  // Устанавливаем заголовок страницы при монтировании компонента.
  useEffect(() => { document.title = 'Обновить партнера' }, [])

  // Хук useLocation из react-router позволяет получить доступ к состоянию текущего URL.
  // Мы используем его для получения данных о партнере, переданных через Link state.
  const location = useLocation();

  // Хук useState для управления состоянием партнера. 
  // Начальное значение берется из location.state.partner.
  const [partner, setPartner] = useState(location.state.partner);

  // Асинхронная функция для обработки отправки формы.
  async function submitHandler(e) {
    // Предотвращаем стандартное поведение формы.
    e.preventDefault()

    // Создаем объект с обновленными данными партнера.
    // `id` берется из текущего состояния, а остальные поля - из формы.
    const updPartner = {
      id: partner.id,
      type: e.target.type.value,
      name: e.target.name.value,
      ceo: e.target.ceo.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      rating: e.target.rating.value
    }
    // Вызываем функцию `updatePartner` из API для обновления данных в основном процессе.
    await window.api.updatePartner(updPartner);

    // Обновляем локальное состояние компонента новыми данными.
    setPartner(updPartner)

    // Сбрасываем форму (хотя в данном случае поля останутся заполненными из-за `defaultValue` и обновления state).
    document.querySelector('form').reset()
  }

  // JSX-разметка компонента.
  return <div className="form">
    <Link to={'/'}><button>{"<-- Назад"}</button></Link>
    <h1>Обновить партнера</h1>
    <form onSubmit={(e) => submitHandler(e)}>
      <label htmlFor="name">Наименование:</label>
      {/* Атрибут `defaultValue` устанавливает начальное значение поля ввода. 
          В отличие от `value`, он позволяет пользователю редактировать поле. */}
      <input id="name" type="text" required defaultValue={partner.name} />
      
      <label htmlFor="type">Тип партнера:</label>
      <select name="" id="type" required defaultValue={partner.type} >
        <option value="ЗАО">ЗАО</option>
        <option value="ООО">ООО</option>
        <option value="ОАО">ОАО</option>
        <option value="ПАО">ПАО</option>
      </select>
      
      <label htmlFor="rating">Рейтинг:</label>
      <input id="rating" type="number" step="1" min='0' max='100' required defaultValue={partner.rating}/>
      
      <label htmlFor="address">Адрес:</label>
      <input id="address" type="text" required defaultValue={partner.address} />
      
      <label htmlFor="ceo">ФИО директора:</label>
      <input id="ceo" type="text" required defaultValue={partner.ceo} />
      
      <label htmlFor="phone">Телефон:</label>
      <input id="phone" type="tel" required defaultValue={partner.phone} />
      
      <label htmlFor="email">Email компании:</label>
      <input id="email" type="email" required defaultValue={partner.email}/>
      
      <button type="submit">Обновить партнера</button>
    </form>
  </div>
}