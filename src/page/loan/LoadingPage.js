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

  // useEffect(() => {
  //   const swiftUpElements = document.querySelectorAll(".swift-up-text");

  //   swiftUpElements.forEach((elem) => {
  //     const words = elem.textContent.split(" ");
  //     elem.innerHTML = "";

  //     words.forEach((el, index) => {
  //       words[index] = `<span><i>${words[index]}</i></span>`;
  //     });

  //     elem.innerHTML = words.join(" ");

  //     const children = document.querySelectorAll("span > i");
  //     children.forEach((node, index) => {
  //       node.style.animationDelay = `${index * 0.2}s`;
  //     });
  //   });
  // }, [timer]);

  return (
    <div>
      <div
        className="keeploading"
        style={{
          display: timer === true ? "block" : "none",
        }}
      >
        <img className="limitImg" src="/image/selectLimit.svg" width={"40%"} />
        <div className="container">
          <h1 className="swift-up-text">{name}님의 대출 한도는</h1>
          <h1>{limit}원 입니다.</h1>
        </div>
        <div
          style={{ display: location.state.consult === "1" ? "block" : "none" }}
        >
          <Link
            to="/hows/loan/detail/limit/uploaddocs"
            state={{
              loanname: location.state.loanname,
              bankname: location.state.bankname,
              exlimit: { limit },
            }}
          >
            <button style={{ marginTop: "30%" }}>대출 실행 계속</button>
          </Link>
        </div>
        <div
          style={{ display: location.state.consult === "1" ? "none" : "block" }}
        >
          <Link to="/hows/loan">
            <button style={{ marginTop: "30%" }}>돌아가기</button>
          </Link>
        </div>
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
