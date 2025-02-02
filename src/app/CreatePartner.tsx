import { Link } from "react-router";

type Partner = {
  type: {
    value: string;
  };
  name: {
    value: string;
  };
  ceo: {
    value: string;
  };
  email: {
    value: string;
  };
  phone: {
    value: string;
  };
  address: {
    value: string;
  };
  rating: {
    value: number;
  };
};

export default function CreatePartner() {
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & Partner;
    const partner = {
      type: target.type.value,
      name: target.name.value,
      ceo: target.ceo.value,
      email: target.email.value,
      phone: target.phone.value,
      address: target.address.value,
      rating: target.rating.value,
    };
    await window.api.createPartner(partner);
    document.querySelector("form").reset();
  }

  return (
    <>
      <title>Создать партнера</title>
      <div className="form">
        <Link to={"/"}>
          <button>{"<-- Назад"}</button>
        </Link>

        <h1>Создать партнера</h1>
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
          <input
            id="rating"
            type="number"
            step="1"
            min="0"
            max="100"
            required
          />
          <label htmlFor="address">Адрес:</label>
          <input id="address" type="text" required />
          <label htmlFor="ceo">ФИО директора:</label>
          <input id="ceo" type="text" required />
          <label htmlFor="phone">Телефон:</label>
          <input id="phone" type="tel" required />
          <label htmlFor="email">Email компании:</label>
          <input id="email" type="email" required />
          <button type="submit">Создать партнера</button>
        </form>
      </div>
    </>
  );
}
