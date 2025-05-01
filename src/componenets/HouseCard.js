import React from "react";
import { useNavigate } from "react-router-dom";

export default function HouseCard(props) {
  const navigate = useNavigate();
  const baseUrl = "https://angular.dev/assets/images/tutorials/common";
  const HouseData = props.data;

  const onClickViewDetails = () => {
    navigate("/details", { state: { HouseData } });
  };

  // const onClickRemove = () => {
  //   RemoveSavedData(HouseData.id).then((res) => {
  //     if(res) {
  //       alert("Removed from saved data successfully");
  //     }
  //   }).catch((err) => {
  //     alert("Error removing from saved data");
  //     console.error("Error removing from saved data", err);
  //   });
  // };

  return (
    <div className="col-4">
      <div className="card mt-3" style={{ backgroundColor: "#e8e7fa" }}>
        <img
          src={`${baseUrl}${HouseData.photo}`}
          className="card-img-top card-img"
          alt="Home 1"
        />
        <div className="card-body">
          <h5 className="card-title text-primary">{HouseData.name}</h5>
          <p className="card-text">
            {HouseData.city}, {HouseData.state}
          </p>
          {/* {props.isSaved ? <span className="btn btn-primary" onClick={onClickRemove}>Remove From Save</span> :
          <span className="btn btn-primary" onClick={onClickViewDetails}>View Details</span>} */}
          <div className="d-flex flex-row justify-content-between">
            <span className="btn btn-primary" onClick={onClickViewDetails}>
              {props.isApplied ? "Withdraw Application" : "View Details"}
            </span>
            {props.isSaved && <span className="btn btn-danger" onClick={() => props.removed(HouseData.id)}>
              Remove From Save
            </span>}
          </div>
        </div>
      </div>
    </div>
  );
}
