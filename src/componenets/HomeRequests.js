import React, { useEffect, useState } from "react";
import { getHousesByOwnerId } from "../firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firestore";

export default function OwnerHome() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const houses = await getHousesByOwnerId();
          console.log("houses", houses);
          setData(houses);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [searchCity]);

  if (loading) return <div>Loading...</div>;

  const onSubmitReset = () => {
    setSearchCity("");
  };

  const onSubmitSearch = () => {
    setData((prevData) => {
      return prevData.filter((house) =>
        house.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    });
  };

  return (
    <>
      {data.length === 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1>Your Requests</h1>
          <p>No requests found.</p>
        </div>
      ) : (
        <div className="m-2">
          <div className="row mb-1 align-items-center">
            <div className="col-md-4 d-flex gap-2">
              <input
                type="text"
                className="form-control border border-success"
                name="searchCity"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Search by city..."
              />
              <button className="btn btn-success" onClick={onSubmitSearch}>
                Search
              </button>
              {searchCity && (
                <button className="btn btn-primary" onClick={onSubmitReset}>
                  Reset
                </button>
              )}
            </div>
          </div>
          <table className="table table-responsive table-hover table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">HouseLocationId</th>
                <th scope="col">email</th>
                <th scope="col">firstName</th>
                <th scope="col">lastName</th>
              </tr>
            </thead>
            <tbody>
              {data.map((house) => (
                <tr key={house.applicationId}>
                  <td>{house.HouseLocationId}</td>
                  <td>{house.email || "N/A"}</td>
                  <td>{house.firstName || "N/A"}</td>
                  <td>{house.lastName || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
