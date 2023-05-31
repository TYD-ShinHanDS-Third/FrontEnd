import React from "react";
import "../../css/loan/LoanList.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";

function LoanList(props) {
  const [bank, setBank] = React.useState("");

  const handleChange = (event) => {
    setBank(event.target.value);
  };

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
              <MenuItem value={"shinhan"}>신한은행</MenuItem>
              <MenuItem value={"kookmin"}>국민은행</MenuItem>
              <MenuItem value={"woori"}>우리은행</MenuItem>
              <MenuItem value={"hana"}>하나은행</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="loanbody">
        <hr className="loanhr" />
        <div className="loan">
          <Link
            to="/hows/loan/detail"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="loantitle">
              <h2>버팀목 전세자금 대출</h2>
            </div>
            <div className="loandis">
              <p>
                주택을 임차하는 근로자 및 서민의 주거 안정을 위한 주택 도시
                기금을 재원으로 하는 전세자금대출 상품
              </p>
            </div>
          </Link>
          <div className="loanbtn">
            <button className="applybtn">신청하기</button>
            <button className="limitbtn">한도조회</button>
            <button className="consultbtn">상담신청</button>
          </div>
        </div>
      </div>

      <div className="loanbody">
        <hr className="loanhr" />
        <div className="loan">
          <Link
            to="/hows/loan/detail"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="loantitle">
              <h2>버팀목 전세자금 대출</h2>
            </div>
            <div className="loandis">
              <p>
                주택을 임차하는 근로자 및 서민의 주거 안정을 위한 주택 도시
                기금을 재원으로 하는 전세자금대출 상품
              </p>
            </div>
          </Link>
          <div className="loanbtn">
            <button className="applybtn">신청하기</button>
            <button className="limitbtn">한도조회</button>
            <button className="consultbtn">상담신청</button>
          </div>
        </div>

        <hr />

        <div className="loan">
          <Link
            to="/hows/loan/detail"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="loantitle">
              <h2>버팀목 전세자금 대출</h2>
            </div>
            <div className="loandis">
              <p>
                주택을 임차하는 근로자 및 서민의 주거 안정을 위한 주택 도시
                기금을 재원으로 하는 전세자금대출 상품
              </p>
            </div>
          </Link>
          <div className="loanbtn">
            <button className="applybtn">신청하기</button>
            <button className="limitbtn">한도조회</button>
            <button className="consultbtn">상담신청</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanList;
