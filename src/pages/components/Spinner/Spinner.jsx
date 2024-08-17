import React from "react";
import spinnerImg from "../../../assets/loading.gif";

const Spinner = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={spinnerImg} alt="" className="d-block m-auto" style={{width:'200px'}} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Spinner;
