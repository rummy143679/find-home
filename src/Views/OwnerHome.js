import React, { useEffect, useState } from "react";
import { getHousesByUserId } from "../firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function OwnerHome() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const houses = await getHousesByUserId(user);
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

  const onClickEdit = (id) => {
    console.log("click edit", id);
    navigate(`/edit-house?houseId=${id}`);
  };

  const onClickDelete = (id) => {
    console.log("click delete", id);
  };

  const onSubmitReset = () => {
    setSearchCity("");
  };

  const onSubmitSearch = () => {
    console.log(" click reset");
    setData((prevData) => {
      return prevData.filter((house) =>
        house.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    });
  };

  const handleCreate = () => {
    navigate("/upload-house")
  };

  return (
    <>
      {data.length === 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1>Your Houses</h1>
          <p>No houses found.</p>
        </div>
      ) : (
        <div className="m-2">
          <div className="row mb-1 align-items-center">
            {/* Left side: search input + buttons */}
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

            <div className="col-md-8 d-flex justify-content-end">
              <button className="btn btn-success" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
          <table className="table table-responsive table-hover table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">House Name</th>
                <th scope="col">Location</th>
                {/* <th scope="col">Owner ID</th> */}
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((house) => (
                <tr key={house.id}>
                  <td scope="row">{house.id}</td>
                  <td>{house.name || "N/A"}</td>
                  <td>{`${house.city}, ${house.state}` || "N/A"}</td>
                  {/* <td>{house.ownerId}</td> */}
                  <td className="d-flex justify-content-center">
                    <i
                      className="bi bi-pencil me-4"
                      onClick={() => onClickEdit(house.id)}
                    ></i>
                    <i
                      className="bi bi-trash"
                      onClick={() => onClickDelete(house.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
