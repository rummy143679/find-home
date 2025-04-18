import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UploadHouse } from "../firebase/firestore";

export default function EditHouseForm() {
  const navigate = useNavigate();
  const [house, setHouse] = useState({
    name: "",
    city: "",
    state: "",
    availableUnits: 0,
    wifi: false,
    laundry: false,
    photo: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setHouse((prev) => {
      if (e.target.name == "wifi" || e.target.name === "laundry") {
        return { ...prev, [e.target.name]: e.target.checked };
      } else {
        return { ...prev, [e.target.name]: e.target.value };
      }
    });
  };

  const handleSave = async () => {
    try {
        const res = await UploadHouse(house);
        if(res){
            alert("Successfully added")
            handleCancel();
        }
    } catch (error) {
        console.error(error)
        alert("Not Saved")
    }
  };

  const handleCancel = () => {
    navigate("/owner-home");
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    console.log(imageFile);
  };

  return (
    <div className="row mt-1 d-flex align-items-center justify-content-center">
      <div className="col-6 card shadow p-2 login-card">
        <h3 className="text-center">Upload House</h3>
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
        {/* <div className="mb-1">
            <label className="form-label">Photo</label>
            <input
                type="file"
                className="form-control"
                accept="image/*"
                name="photo"
                onChange={handleFileChange}
            />
            </div> */}
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
