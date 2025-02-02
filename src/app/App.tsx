import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Partner } from "../../types";
import l from "./assets/icon.png";

export default function App() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await (window as any).api.getPartners();
        setPartners(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPartners();
  }, []);

  return (
    <>
      <title>Партнеры</title>
      <div className="page-heading">
        <img className="page-logo" src={l} alt="" />
        <h1>Партнеры</h1>
      </div>
      <ul className="partners-list">
        {partners.map((partner) => {
          return (
            <li
              className="partner-card"
              key={partner.id}
              onClick={() => navigate("/update", { state: partner })}
            >
              <div className="partner-data">
                <p className="card_heading">
                  {partner.type} | {partner.name}
                </p>
                <div className="partner-data-info">
                  <p>{partner.ceo}</p>
                  <p>{partner.phone}</p>
                  <p>Рейтинг: {partner.rating}</p>
                </div>
              </div>
              <div className="partner-sale partner-data card_heading">
                {partner.discount}%
              </div>
            </li>
          );
        })}
      </ul>

      <Link to={"/create"}>
        <button>Создать партнера</button>
      </Link>
    </>
  );
}
