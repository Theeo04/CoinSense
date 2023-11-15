import React, { useEffect, useState } from "react";
import axios from "axios";

function NewsHome() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://cryptopanic.com/api/v1/posts/?auth_token=b612e3a9d13fa264703a8e753c2e43ce82c461b9&public=true"
        );

        // Assuming the response contains the news articles in response.data.results
        setNews(response.data.results);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNews();
  }, []);

  console.log("News", news);

  return <div>NewsHome</div>;
}

export default NewsHome;
