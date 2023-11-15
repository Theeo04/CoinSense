import LineChart from "@/components/LineChart";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdArrowBack, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

const NamePage = () => {
  const router = useRouter();
  const { name } = router.query;
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  function backToHome() {
    router.push("/homepage");
  }

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateObject.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from api.coincap.io/v2/assets/coinname
        const response1 = await fetch(
          `https://api.coincap.io/v2/assets/${name.toLowerCase()}`
        );
        const result1 = await response1.json();
        setData1(result1.data);

        // Fetching data from api.coincap.io/v2/assets/coinname/history?interval=d1
        const response2 = await fetch(
          `https://api.coincap.io/v2/assets/${name.toLowerCase()}/history?interval=d1`
        );
        const result2 = await response2.json();
        setData2(result2.data);

        // Fetching additional data (for example)
        // const response3 = await fetch("ANOTHER_API_ENDPOINT_URL");
        // const result3 = await response3.json();
        // setData3(result3.data);
      } catch (error) {
        console.error("Error fetching crypto data: ", error);
      }
    };

    fetchData();
  }, [name]); // Include name in the dependency array to refetch data when name changes

  console.log("For Info ===>", data1);
  console.log("For Graphic ===>", data2);

  const dataGraph = {
    labels: data2 ? data2.slice(-50).map((item) => formatDate(item.date)) : [],
    datasets: [
      {
        label: "Price (USD)",
        data: data2 ? data2.slice(-50).map((item) => item.priceUsd) : [],
        borderColor: "white",
        backgroundColor: ["#31203b"],
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div className="coin-bg pt-[20px] pl-[120px] pb-[50px]">
      <div className="flex space-x-5 pb-[40px]">
        <MdArrowBack
          onClick={backToHome}
          className="text-[50px] text-white mt-6 hover:cursor-pointer"
        />
        <h1 className="text-white text-[60px] font-[600]">{name}</h1>
        {data1 && data1.symbol && (
          <img
            src={`https://assets.coincap.io/assets/icons/${data1.symbol.toLowerCase()}@2x.png`}
            alt={name}
            className="w-[50px] h-[50px] mt-7"
          />
        )}
      </div>

      <div className="flex space-x-[150px] w-[1100px] text-white chart-bg rounded-xl z-10">
        {data2 ? <LineChart chartData={dataGraph} /> : <p>Loading data...</p>}

        <div className="w-[1200px] space-y-5 bg-gradient-to-br from-purple-800 via-purple-900 bg-opacity-60 rounded-3xl">
          {/* Rank */}
          <div className="flex space-x-10">
            <p className="w-[250px] text-[27px] pl-4 pt-4">Rank:</p>
            <p className="text-[27px] pr-5 pt-4">
              {data1?.rank != null ? Number(data1.rank) : "N/A"}
            </p>
          </div>

          {/* Symbol */}
          <div className="flex space-x-10">
            <p className="w-[250px] text-[27px] pl-4">Symbol:</p>
            <p className="text-[27px] pr-5">
              {data1?.symbol != null ? data1.symbol : "N/A"}
            </p>
          </div>

          {/* Price */}
          <div className="flex space-x-10">
            <p className="w-[250px] text-[27px] pl-4">Price:</p>
            <p className="text-[27px] w-[200px] pr-5">
              {data1?.priceUsd != null
                ? `${Number(data1.priceUsd).toLocaleString("de-DE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} USD`
                : "N/A"}
            </p>
          </div>

          {/* Changes */}
          <div className="flex space-x-10">
            <p className="w-[250px] text-[27px] pl-4">Last 24h Changes:</p>
            <p className="text-[27px] flex">
              {data1?.changePercent24Hr != null
                ? Number(data1.changePercent24Hr).toFixed(4)
                : "N/A"}

              <div>
                {data1?.changePercent24Hr >= 0 ? (
                  <span>
                    <MdArrowDropUp className="text-[75px] text-green-300 pb-5" />
                  </span>
                ) : (
                  <span>
                    <MdArrowDropDown className="text-[50px] text-red-400 pb-5" />
                  </span>
                )}
              </div>
            </p>
          </div>

          {/* More info, redirect to blockchain site */}
          <div className="flex space-x-10">
            <div className="flex">
              <p className="w-[250px] text-[27px] pl-4">More Informations</p>
              <FaExternalLinkAlt
                onClick={() => window.open(`${data1.explorer}`, "_blank")}
                className="text-[35px] ml-10 pt-2 hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NamePage;
