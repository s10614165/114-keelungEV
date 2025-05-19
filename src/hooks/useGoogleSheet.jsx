import { useState, useEffect } from "react";
import axios from "axios";


const useGoogleSheet = ({range = "★大表(主要版本)勿動!",sheetId=""}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function setLoadingState(isLoading) {
    setLoading(isLoading);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const sheetId = import.meta.env.VITE_MotorcycleShops_GogleSheet__ID;
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [range]);

  return { data, loading, error,setLoadingState };
};

export default useGoogleSheet;
