import { Link, useLocation } from "react-router";

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

export default function UpdatePartner() {
  const location = useLocation();

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & Partner;
    const updPartner = {
      id: location.state.id,
      type: target.type.value,
      name: target.name.value,
      ceo: target.ceo.value,
      email: target.email.value,
      phone: target.phone.value,
      address: target.address.value,
      rating: target.rating.value,
    };
    await window.api.updatePartner(updPartner);
    document.querySelector("form").reset();
  }

  return (
    <>
      <title>Обновить партнера</title>
      <div className="form">
        <Link to={"/"}>
          <button>{"<-- Назад"}</button>
        </Link>
        <h1>Обновить партнера</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <label htmlFor="name">Наименование:</label>
          <input
            id="name"
            type="text"
            required
            defaultValue={location.state.name}
          />
          <label htmlFor="type">Тип партнера:</label>
          <select name="" id="type" required defaultValue={location.state.type}>
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
            defaultValue={location.state.rating}
          />
          <label htmlFor="address">Адрес:</label>
          <input
            id="address"
            type="text"
            required
            defaultValue={location.state.address}
          />
          <label htmlFor="ceo">ФИО директора:</label>
          <input
            id="ceo"
            type="text"
            required
            defaultValue={location.state.ceo}
          />
          <label htmlFor="phone">Телефон:</label>
          <input
            id="phone"
            type="tel"
            required
            defaultValue={location.state.phone}
          />
          <label htmlFor="email">Email компании:</label>
          <input
            id="email"
            type="email"
            required
            defaultValue={location.state.email}
          />
          <button type="submit">Обновить партнера</button>
        </form>
      </div>
    </>
  );
}
