import React, { useEffect, useState } from "react";
import "../../css/loan/Loading.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function LoadingPage(props) {
  const location = useLocation();
  const [timer, setTimer] = useState(false);
  const [limit, setLimit] = useState();
  const [name, setName] = useState();

  const getLimit = () => {
    const url = "/hows/loan/detail/limit";
    console.log("jumin", location.state.jumin);
    axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
        },
        params: {
          jumin: location.state.jumin,
          price: location.state.price,
        },
      })
      .then(function (response) {
        console.log("res", response);
        setLimit(response.data.maxloan);
        setName(response.data.myname);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getLimit();
    const token = setTimeout(() => {
      setTimer(true);
    }, 3000);
  }, []);

  return (
    <div>
      <div
        className="keeploading"
        style={{
          display: timer === true ? "block" : "none",
        }}
      >
        <div className="texContainer">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
          <h2 className="swift-up-text">
            {name}님의 대출 한도는 {limit}원 입니다.
          </h2>
        </div>
        <img className="limitImg" src="/image/limit.svg" width={"40%"} />
        <div
          style={{ display: location.state.consult === "1" ? "flex" : "none" }}
        >
          <Link
            to="/hows/loan/detail/limit/uploaddocs"
            state={{
              loanname: location.state.loanname,
              bankname: location.state.bankname,
              exlimit: { limit },
            }}
          >
            <button className="limitNextBtn" style={{ marginTop: "30%" }}>
              대출 실행 계속
            </button>
          </Link>
        </div>
        <div
          style={{
            display: location.state.consult === "1" ? "none" : "flex",
            justifyContent: "center",
          }}
        >
          <Link to="/hows/loan">
            <button style={{ marginTop: "30%" }} className="limitNextBtn">
              돌아가기
            </button>
          </Link>
        </div>
      </div>
      <div
        className="keeploading"
        style={{
          display: timer === false ? "block" : "none",
          justifyContent: "center",
        }}
      >
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <div class="loading">
          <span>한</span>
          <span>도</span>
          <span>조</span>
          <span>회</span>
          <span>중</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
