import axios from "axios";
import React, { useEffect } from "react";

function LoanDescription(props) {
  function getDetail() {
    const url = "/hows/loan/detail";
    const loan = { loanname: "버팀목 전세자금 대출", bankname: "신한" };
    axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          loanname:
            "하나 청년전세론 청년층 주거비용 경감을 위해 임차보증금의 90%이내, 최대 2억원까지(전세,반전세 계약 모두 가능합니다)",
          bankname: "하나",
        },
      })
      .then((res) => {
        console.dir(res);
        document.getElementById("detail").innerHTML += res.data.html1;
        document.getElementById("detail").innerHTML += res.data.html2;
        document.getElementById("detail").innerHTML += res.data.html3;
        document.getElementById("detail").innerHTML += res.data.html4;
        document.getElementById("detail").innerHTML += res.data.html5;
        document.getElementById("detail").innerHTML += res.data.html6;
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  }

  useEffect(() => {
    getDetail();
  });

  return <div id="detail">대출 상세 정보 볼수 있는 페이지</div>;
}

export default LoanDescription;
