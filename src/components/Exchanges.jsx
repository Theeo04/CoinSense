import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidRightTopArrowCircle } from "react-icons/bi";

function Exchanges() {
  const [exchangeData, setExchangeData] = useState([]);

  useEffect(() => {
    const fetchExchangeData = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/exchanges");
        const { data } = response.data;
        setExchangeData(data);
      } catch (error) {
        console.error("Error fetching price data:", error);
      }
    };

    fetchExchangeData();
  }, []);
  console.log(exchangeData);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(number);
  };

  return (
    <div>
      <p className="exchange-home-title">Best Exchanges</p>
      <div className="exchange-home">
        <ul>
          <div className="home-asset-desc">
            {/* <p className="home-asset-desc-rank">Rank</p> */}
            <p className="home-ex-name">Name</p>
            <p className="home-ex-volume">Volume</p>
            <p className="home-ex-link">Redirect</p>
          </div>
          {exchangeData.slice(0, 5).map((exchange) => (
            <li key={exchange.exchangeId}>
              <div className="home-exchange--container">
                <p className="home-exchange--container-rank">
                  {exchange.rank}.
                </p>
                <p className="home-exchange--container-name">{exchange.name}</p>
                <p className="data__container-price ">
                  {formatNumber(exchange.volumeUsd)} $
                </p>
                <button
                  className="home-exchange--container-btn"
                  onClick={() => window.open(exchange.exchangeUrl, "_blank")}
                >
                  <BiSolidRightTopArrowCircle />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Exchanges;
