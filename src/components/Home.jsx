import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../../supabase";
import { FiArrowRightCircle } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import Link from "next/link";

import NewsHome from "./NewsHome";
import Exchanges from "./Exchanges";
import useSelectedItemStore from "../../useSelectedItemStore";

function Home() {
  const [user, setUser] = useState(null);
  const [priceData, setPriceData] = useState([]);

  // Get Session User data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser(); // Destructure user data
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets");
        const { data } = response.data;
        setPriceData(data);
      } catch (error) {
        console.error("Error fetching price data:", error);
      }
    };

    fetchPriceData();

    const interval = setInterval(fetchPriceData, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log(priceData);

  //ZuStand =>
  const addSelectedItem = useSelectedItemStore(
    (state) => state.addSelectedItem
  );

  return (
    <div className="home--container">
      <h1 className="home--title">Top Cryptocurrency</h1>
      <div className="assets--container">
        <div className="home-asset-desc">
          {/* <p className="home-asset-desc-rank">Rank</p> */}
          <p className="home-asset-desc-name">Name</p>
          <p className="home-asset-desc-price">Price</p>
          <p className="home-asset-desc-changes">24h</p>
          <p className="home-asset-desc-save">Save</p>
          <p className="home-asset-desc-more">Find more</p>
        </div>
        <ul>
          {priceData.slice(0, 5).map((asset) => (
            <li key={asset.id}>
              <div className="data__container">
                <p className="data__container-rank">{asset.rank}.</p>
                <img
                  src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                  alt={asset.name}
                  className="data__container-logo"
                />
                <p className="data__container-name">{asset.name} </p>
                <p className="data__container-price">
                  ${" "}
                  {parseFloat(asset.priceUsd).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                </p>
                <p
                  className={`data__container-change ${
                    parseFloat(asset.changePercent24Hr).toFixed(2) < 0
                      ? "data__container-change-lower"
                      : "data__container-change-higher"
                  } `}
                >
                  {parseFloat(asset.changePercent24Hr).toFixed(2)} %
                </p>
                <button
                  className="data__container-star"
                  onClick={() => addSelectedItem(asset)}
                >
                  <AiOutlineStar />
                </button>
                <a className="data__container-btn">
                  <Link href={`/[name]`} as={`/${asset.name}`}>
                    <FiArrowRightCircle />
                  </Link>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Crypto Exchanges */}
      <Exchanges />
      <NewsHome />
    </div>
  );
}

export default Home;
