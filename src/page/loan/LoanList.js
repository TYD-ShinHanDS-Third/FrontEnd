import React, { useEffect, useState } from "react";
import "../../css/loan/LoanList.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

function LoanList(props) {
  const [bank, setBank] = useState("");

  const [loanlist, setLoanList] = useState([]);
  //신한, 국민: summary 우리: html1

  const handleChange = (event) => {
    setBank(event.target.value);
  };

  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  //목록 가져오기
  async function getList() {
    const url = "/hows/loan";
    await axios
      .get(url, {
        params: {
          bankname: bank,
          page: 0,
          size: 9,
        },
        headers: {
          "Content-type": "application/json",
        },
      })
      .then(function (response) {
        console.dir(response.data);
        setLoanList(response.data.obj);
        // response.obj.map((loan) => {
        //   if (bank === "신한" || bank === "국민") {
        //     setLoanList([
        //       ...loan,
        //       { loanname: loan.loanname, summary: loan.type },
        //     ]);
        //   } else if (bank === "우리") {
        //     setLoanList([
        //       ...loan,
        //       { loanname: loan.loanname, summary: loan.type },
        //     ]);
        //   } else if (bank === "하나") {
        //     setLoanList([
        //       ...loan,
        //       { loanname: loan.loanname, summary: loan.type },
        //     ]);
        //   }
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(loanlist);
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="loanList">
      <div className="loanheader">
        <div className="pageTitle">
          <h2>전세자금 대출 상품</h2>
        </div>
        <div className="comSelector">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              은행선택
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={bank}
              onChange={handleChange}
              label="bank"
            >
              <MenuItem value={"신한"}>신한은행</MenuItem>
              <MenuItem value={"국민"}>국민은행</MenuItem>
              <MenuItem value={"우리"}>우리은행</MenuItem>
              <MenuItem value={"하나"}>하나은행</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="loanbody">
        <hr className="loanhr" />
        {loanlist.map((pro) => {
          return (
            <div className="loan">
              <Link
                to="/hows/loan/detail"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="loantitle">
                  <h2>{pro.loanname}</h2>
                </div>
                <div className="loandis">
                  <p>{pro.type}</p>
                </div>
              </Link>
              <div className="loanbtn">
                <Link
                  to="/hows/loan/detail/limit"
                  style={{ marginRight: "3%", width: "12%" }}
                >
                  <button className="limitbtn">한도조회</button>
                </Link>
                <Link
                  to="/hows/loan/detail/consult"
                  style={{ width: "12%" }}
                  state={{
                    //bankname: bank,
                    //loanname: pro.loanname,
                    bankname: "신한",
                    loanname: "쏠편한 전세대출(주택도시보증)",
                    token: token,
                  }}
                >
                  <button className="consultbtn">상담신청</button>
                </Link>
              </div>
            </div>
          );
        })}

        <hr />
      </div>
    </div>
  );
}

export default LoanList;
