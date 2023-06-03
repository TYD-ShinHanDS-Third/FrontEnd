import React from "react";
import "../../css/my/MyEdit.css";
import {
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function MyEdit(props) {
  const [bank, setBank] = React.useState("");

  const bankChange = (event) => {
    setBank(event.target.value);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
      <div className="myEditBody">
        <div className="editContainer1">
          <div className="editItem" id="editName">
            <input id="memberName" name="memberName" placeholder="이름" />
          </div>
          <div className="editItem" id="editId">
            <input id="memberId" name="memberId" placeholder="아이디" />
          </div>
          <div className="editItem" id="editPw">
            <input id="pswd" name="pswd" placeholder="비밀번호" />
          </div>
          <div className="myEditBtn">
            <button>수정</button>
          </div>
          <div className="editItem" id="editPwChk">
            <input id="pswdChk" name="pswdChk" placeholder="비밀번호 확인" />
          </div>
          <div className="editItem" id="editBirth">
            <input id="bDay" name="bDay" placeholder="생년월일" />
          </div>
          <div className="deleteBtn">
            <button>탈퇴</button>
          </div>
          <div className="editItem" id="editPhone">
            <input id="phone" name="phone" placeholder="전화번호" />
          </div>
      </div>
      <div className="editContainer2">
        <div className="editItem" id="addInfo">
          추가 정보
        </div>
      <div className="editItem" id="editBank">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        은행
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={bankChange}
                        label="은행명"
                        value={bank}
                      >
                        <MenuItem value={"신한"}>신한</MenuItem>
                        <MenuItem value={"국민"}>국민</MenuItem>
                        <MenuItem value={"우리"}>우리</MenuItem>
                        <MenuItem value={"하나"}>하나</MenuItem>
                      </Select>
                    </FormControl>
                    <input name="accNo" placeholder="계좌번호" />
                  </div>
                  <div className="editItem" id="editHasJob">
                    <span>직장유무</span>
                    <div className="select">
                      <input
                        type="radio"
                        id="select1"
                        name="hasJob"
                        value="true"
                        label="hasJob"
                      />
                      <label htmlFor="select1">유</label>
                      <input
                        type="radio"
                        id="select2"
                        name="hasJob"
                        value="false"
                        label="hasJob"
                      />
                      <label htmlFor="select2">무</label>
                    </div>
                    </div>

                    <div className="editItem" id="editJob">
                    <input name="jobName" placeholder="직장명"/>
                    <input id="hireDate" name="hireDate" placeholder="입사년도" />
                    </div>
                    <div className="editItem" id="editMarry">
                    <span>결혼</span>
                    <div className="select">
                      <input
                        type="radio"
                        id="select3"
                        name="marry"
                        value="false"
                        label="marry"
                      />
                      <label htmlFor="select3">미혼</label>
                      <input
                        type="radio"
                        id="select4"
                        name="marry"
                        value="true"
                        label="marry"
                      />
                      <label htmlFor="select4">기혼</label>
                    </div>
                  </div>

                  <div className="editItem" id="editHasChild">
                    <span>자녀</span>
                    <div className="select">
                      <input
                        type="radio"
                        id="select5"
                        name="hasChild"
                        value="false"
                        label="hasChild"
                      />
                      <label htmlFor="select5">무</label>
                      <input
                        type="radio"
                        id="select6"
                        name="hasChild"
                        value="true"
                        label="hasChild"
                      />
                      <label htmlFor="select6">1명</label>
                      <input
                        type="radio"
                        id="select7"
                        name="hasChild"
                        value="true"
                        label="hasChild"
                      />
                      <label htmlFor="select7">2명이상</label>
                    </div>
                  </div>
              </div>
      </div>
  );
};
export default MyEdit;
