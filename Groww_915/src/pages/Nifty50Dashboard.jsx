import { useState, useEffect } from "react";

const API_URL = "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050";

export const Nifty50Dashboard=()=> {
  const [stocks, setStocks] = useState([]);
  const [indexData, setIndexData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNifty50 = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, {
          headers: {
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": "https://www.nseindia.com/",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // data.data[0] = index summary, rest = individual stocks
        const [index, ...stockList] = data.data;
        setIndexData(index);
        setStocks(stockList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNifty50();
  }, []); // runs once on mount

  return(
    <>
        <h1>Hello</h1>
    </>
  )
}