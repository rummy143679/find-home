import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHousesById, updateHouseDetails } from "../firebase/firestore";

export default function EditHouseForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const houseId = new URLSearchParams(location.search).get("houseId");
  const [house, setHouse] = useState(null);

  useEffect(() => {
    fetchData();
  }, [houseId]);

  const fetchData = async () => {
    const house = await getHousesById(houseId);
    console.log("useEffect",typeof house)
    setHouse(house);
  };

  const handleChange = (e) => {
    setHouse((prev) => {
      if(e.target.name == "wifi" || e.target.name === "laundry"){
        return {...prev, [e.target.name] : e.target.checked}
      }else{
        return {...prev, [e.target.name] : e.target.value}
      }
    });
  };

  const handleSave = () => {
    try{
      const res = updateHouseDetails(house, houseId)
      if(res){
        alert("updated successfull")
        handleCancel();
      }
    }catch(e){
      alert("update failed")
      console.error(e)
    }
  };

  const handleCancel = () => {
    navigate("/owner-home")
  }

  if (!house){
    return <p>Loading...</p>;
  } 

  return (
    <div className="row mt-4 d-flex align-items-center justify-content-center">
      <div className="col-6 card shadow p-4 login-card">
        <h3>Edit House: {houseId}</h3>
        <div className="mb-1">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="name"
            value={house.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-1">
          <label className="form-label">City</label>
          <input
            className="form-control"
            name="city"
            value={house.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-1">
          <label className="form-label">State</label>
          <input
            className="form-control"
            name="state"
            value={house.state}
            onChange={handleChange}
          />
        </div>
        <div className="mb-1">
          <label className="form-label">Available units</label>
          <input
            className="form-control"
            name="availableUnits"
            value={house.availableUnits}
            onChange={handleChange}
          />
        </div>
        <div className="form-check form-check-inline mb-1">
          <label className="form-check-label" htmlFor="wifi">
            Wifi
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="wifi"
            name="wifi"
            checked={house.wifi}
            onChange={handleChange}
          />
        </div>
        <div className="form-check form-check-inline mb-1">
          <label className="form-check-label" htmlFor="laundry">
            Laundy
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="laundry"
            name="laundry"
            checked={house.laundry}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-success me-5" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
