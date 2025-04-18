import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function HouseCard(props) {

    const navigate = useNavigate();
    const baseUrl = 'https://angular.dev/assets/images/tutorials/common';
    const [HouseData, setHouseData] = useState(props.data);

    const onClickViewDetails = () => {
        navigate("/details", { state: { HouseData } });
    }

  return (
    <div className="col-4">
      <div className="card mt-3" style={{ backgroundColor: '#e8e7fa' }}>
        <img src={`${baseUrl}${HouseData.photo}`} className="card-img-top card-img" alt="Home 1" />
        <div className="card-body">
          <h5 className="card-title text-primary">{HouseData.name}</h5>
          <p className="card-text">{HouseData.city}, {HouseData.state}</p>
          <a className="btn btn-primary" onClick={onClickViewDetails}>View Details</a>
        </div>
      </div>
    </div>
  )
}
