import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
const ClosedPoolCard = (props) => {
  return (
    <div className=" card-main">
      <div className="main-image">
        <img src={props.logoURL} alt="" style={{ width: 60, height: 60, borderRadius: '50%' }} />
        <h1>{props.projectName}</h1>
        <button>{props.tier}</button>
      </div>
      <div className="progress-baar">
        <div className="percentage">
          <p className="one">Progress</p>
          <p>100%</p>
        </div>
        <div class="progress">
          <div className="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className='button text-center'>
          <button>closed</button>
        </div>
      </div>
    </div>
  );
}
export default ClosedPoolCard

