import React, { useState, useEffect } from "react";
import "./Home.css";
import HouseCard from "../componenets/HouseCard";
import { AppliedData } from "../firebase/firestore.js";

export default function Applied() {
  const [HousingData, setHousingData] = useState([]);
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await AppliedData();
      setHousingData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    setHousingData((prevData) => {
      return prevData.filter((house) =>
        house.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    });
  };

  const onSubmitReset = (e) => {
    e.preventDefault();
    setSearchCity("");
    fetchData();
  };

  const HouseCards = HousingData.map((house) => {
    return <HouseCard key={house.id} data={house} isApplied={true} />;
  });

  return (
    <>
      <div className="row">
        <div className="col-4 d-flex flex-row justify-content-center align-items-center mt-1">
          <input
            type="text"
            className="form-control border border-success"
            name="searchCity"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search for homes..."
          />
          <button
            className="btn btn-success search-btn"
            onClick={onSubmitSearch}
          >
            Search
          </button>
          {searchCity && (
            <button
              className="btn btn-primary search-btn"
              onClick={onSubmitReset}
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <div className="row">
        {HouseCards.length > 0 ? (
          HouseCards
        ) : (
          <h4 className="text-center align-items-center">
            No Applied records to display
          </h4>
        )}
      </div>
    </>
  );
}
