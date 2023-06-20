import React, { useEffect, useState } from "react";
import "../../css/loan/Loading.css";
import { Link } from "react-router-dom";

function LoadingPage(props) {
  const [timer, setTimer] = useState(false);
  useEffect(() => {
    const token = setTimeout(() => {
      setTimer(true);
    }, 3000);
  }, []);

  return (
    <div>
      <div
        className="keeploading"
        style={{ display: timer === true ? "block" : "none" }}
      >
        <h1>성은님의 대출 한도는</h1>
        <h1>100만원 입니다.</h1>
        <Link
          to="/hows/loan/detail/limit/uploaddocs"
          //state={{ bankname: bankname, loanname: loanname }}
        >
          <button>계속</button>
        </Link>
      </div>
      <div
        className="keeploading"
        style={{ display: timer === false ? "block" : "none" }}
      >
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <h3>한도 조회중...</h3>
      </div>
    </div>
  );
}

export default LoadingPage;
