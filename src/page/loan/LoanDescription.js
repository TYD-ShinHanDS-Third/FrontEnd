import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";

function LoanDescription(props) {
  const location = useLocation();

  const [divHtml, setDivHtml] = useState([]);
  const arr = [];

  function getDetail(loan, bank) {
    const url = "/hows/loan/detail";
    axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          loanname: loan,
          bankname: bank,
        },
      })
      .then((res) => {
        console.dir(res);
        for (let key in res.data) {
          arr.push(res.data[key]);
        }
        setDivHtml(arr);
        console.log(arr);
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  }

  useEffect(() => {
    const loanname = location.state.loanname;
    const bankname = location.state.bankname;
    console.log(location.state.bankname);
    getDetail(loanname, bankname);
  }, []);

  return (
    <div id="detail">
      {divHtml.map((item1, index) => {
        if (index > 2) {
          return <div dangerouslySetInnerHTML={{ __html: item1 }}></div>;
        }
      })}
    </div>
  );
}

export default LoanDescription;
