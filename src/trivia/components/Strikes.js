import { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./Strikes.css";
import strike1 from "../../img/strike1.png";
import strike2 from "../../img/strike2.png";
import strike3 from "../../img/strike3.png";
import strike1light from "../../img/strike1light.png";
import strike2light from "../../img/strike2light.png";
import strike3light from "../../img/strike3light.png";

const Strikes = ({ strikes, practiceStrikes, practice }) => {
  return (
    <div className="strikes-container-main">
      {!practice && strikes <= 0 && (
        <div className="strikes-container-detail">
          <img className="strike-img" src={strike1light} alt="strike icon" />
          <img className="strike-img" src={strike2light} alt="strike icon" />
          <img className="strike-img" src={strike3light} alt="strike icon" />
        </div>
      )}
      {!practice && strikes === 1 && (
        <div className="strikes-container-detail">
          <img className="strike-img" src={strike1} alt="strike icon" />
          <img className="strike-img" src={strike2light} alt="strike icon" />
          <img className="strike-img" src={strike3light} alt="strike icon" />
        </div>
      )}
      {!practice && strikes === 2 && (
        <div className="strikes-container-detail">
          <img className="strike-img" src={strike1} alt="strike icon" />
          <img className="strike-img" src={strike2} alt="strike icon" />
          <img className="strike-img" src={strike3light} alt="strike icon" />
        </div>
      )}
      {!practice && strikes >= 3 && (
        <div className="strikes-container-detail">
          <img className="strike-img" src={strike1} alt="strike icon" />
          <img className="strike-img" src={strike2} alt="strike icon" />
          <img className="strike-img" src={strike3} alt="strike icon" />
        </div>
      )}

      {practice && practiceStrikes === 0 && (
        <div className="strikes-container-detail">
          <img className="strike-img" src={strike1light} alt="strike icon" />
          <img className="strike-img" src={strike2light} alt="strike icon" />
          <img className="strike-img" src={strike3light} alt="strike icon" />
        </div>
      )}
      {practice && practiceStrikes === 1 && (
        <div className="strikes-container-detail">
          <img className="strike-img" src={strike1} alt="strike icon" />
          <img className="strike-img" src={strike2light} alt="strike icon" />
          <img className="strike-img" src={strike3light} alt="strike icon" />
        </div>
      )}
      {practice && practiceStrikes === 2 && (
        <div className="strikes-container-detail">
          <img className="strike-img" src={strike1} alt="strike icon" />
          <img className="strike-img" src={strike2} alt="strike icon" />
          <img className="strike-img" src={strike3light} alt="strike icon" />
        </div>
      )}
      {practice && practiceStrikes >= 3 && (
        <div className="strikes-container-detail">
          <img className="strike-img" src={strike1} alt="strike icon" />
          <img className="strike-img" src={strike2} alt="strike icon" />
          <img className="strike-img" src={strike3} alt="strike icon" />
        </div>
      )}
      <div className="strikes-title">
        <p className="strikes-title-detail">Strikes</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    strikes: state.userStrikes.strikes,
    practiceStrikes: state.userStrikes.practiceStrikes,
  };
};

export default connect(mapStateToProps)(Strikes);
