import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function SignUpForm(props) {
  const [bank, setBank] = React.useState("");

  const bankChange = (event) => {
    setBank(event.target.value);
    setMember({ ...member, accBank: event.target.value });
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
    if (!open === false) {
      setMember({
        ...member,
        accBank: "",
        accNo: "",
        hasJob: "",
        jobName: "",
        hireDate: "",
        marry: "",
        hasChild: "",
      });
    }
  };

  const memberInit = {
    memberId: "",
    pswd: "",
    memberName: "",
    bDay: "",
    phone: "",
    role: "",
    level: "",
    accBank: "",
    accNo: "",
    hasJob: "",
    jobName: "",
    hireDate: "",
    marry: "",
    hasChild: "",
  };

  const [member, setMember] = useState(memberInit);

  //오류메시지 상태저장
  const [phoneMessage, setPhoneMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  //아이디 중복 체크, 전화번호 인증 여부 확인
  const [isCheckId, setIsCheckId] = useState(false);
  const [isCheckPhone, setIsCheckPhone] = useState(false);

  const handleSignup = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
    if (e.target.name === "phone") {
      const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
      if (!phoneRegex.test(e.target.value)) {
        setPhoneMessage("전화번호 형식이 틀렸어요 010-0000-0000");
        setIsPhone(false);
      } else {
        setPhoneMessage("올바른 전화번호 형식이에요 : )");
        setIsPhone(true);
      }
    } else if (e.target.name === "bDay") {
      const birthRegex =
        /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
      if (!birthRegex.test(e.target.value)) {
        setBirthMessage("생년월일 형식이 틀렸어요 1900-01-01");
        setIsBirth(false);
      } else {
        setBirthMessage("올바른 생년월일 형식이에요 : )");
        setIsBirth(true);
      }
    } else if (e.target.name === "pswdChk") {
      if (member.pswd === e.target.value) {
        setPasswordConfirmMessage("비밀번호가 일치해요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요");
        setIsPasswordConfirm(false);
      }
    }
  };

  var idChk = 0;
  var phoneChk = 0;

  //아이디 중복 체크
  const checkId = (event) => {
    setIsCheckId(true);
    const url = "/member/signup";
    // axios
    //   .post(url, JSON.stringify(member.memberId), {
    //     headers: {
    //       "Content-Type": `application/json`,
    //     },
    //   })
    //   .then((res) => {
    //     if (res.data.count === 0) {
    //       idChk = 1;
    //       console.log("아이디 사용 가능");
    //     } else {
    //       console.log("아이디 사용 불가");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     console.log("request end");
    //   });
  };

  //전화번호 인증
  const checkPhone = (event) => {
    //
    setIsCheckPhone(true);
  };

  //유효성 검사

  //회원가입
  async function signup() {
    const url = "/member/signup";
    console.log(member);

    // await axios
    //   .post(url, JSON.stringify(member), {
    //     headers: {
    //       "Content-Type": `application/json`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("signup success");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     console.log("request end");
    //   });
  }

  return (
    <div>
      <img className="logoSignup" src="../../image/Logo.svg" alt="hows" />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={8}>
          <input
            id="memberName"
            name="memberName"
            placeholder="이름"
            onChange={handleSignup}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <input
            id="memberId"
            name="memberId"
            placeholder="아이디"
            onChange={handleSignup}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <button onClick={checkId}>중복체크</button>
        </Grid>
        <Grid item xs={12} sm={8}>
          <input
            id="pswd"
            name="pswd"
            placeholder="비밀번호"
            onChange={handleSignup}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {member.pswd.length > 0 && (
            <span
              className={`message ${isPasswordConfirm ? "success" : "error"}`}
            >
              {passwordConfirmMessage}
            </span>
          )}
          <input
            id="pswdChk"
            name="pswdChk"
            placeholder="비밀번호 확인"
            onChange={handleSignup}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {member.bDay.length > 0 && (
            <span className={`message ${isBirth ? "success" : "error"}`}>
              {birthMessage}
            </span>
          )}
          <input
            id="bDay"
            name="bDay"
            placeholder="생년월일"
            onChange={handleSignup}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {member.phone.length > 0 && (
            <span className={`message ${isPhone ? "success" : "error"}`}>
              {phoneMessage}
            </span>
          )}
          <input
            id="phone"
            name="phone"
            placeholder="전화번호"
            onChange={handleSignup}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <button onClick={checkPhone}>전화번호 인증</button>
        </Grid>
        <Grid item xs={12} sm={8}>
          <List
            sx={{
              width: "95%",
              bgcolor: "background.paper",
              fontSize: "10%",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="추가 정보 입력" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 2, minHeight: 80 }}>
                  <Grid item xs={12} sm={3}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        은행
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={bankChange}
                        label="은행명"
                        name="accBank"
                        value={bank}
                      >
                        <MenuItem value={"신한"}>신한</MenuItem>
                        <MenuItem value={"국민"}>국민</MenuItem>
                        <MenuItem value={"우리"}>우리</MenuItem>
                        <MenuItem value={"하나"}>하나</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <input
                      name="accNo"
                      placeholder="계좌번호"
                      onChange={handleSignup}
                    />
                  </Grid>
                </ListItem>
                <ListItem sx={{ pl: 3 }}>
                  <Grid item xs={12} sm={3}>
                    <span className="addInfoSpan">직장유무</span>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <div className="select">
                      <input
                        type="radio"
                        id="select1"
                        name="hasJob"
                        value="true"
                        label="hasJob"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select1">유</label>
                      <input
                        type="radio"
                        id="select2"
                        name="hasJob"
                        value="false"
                        label="hasJob"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select2">무</label>
                    </div>
                  </Grid>
                </ListItem>
                <ListItem sx={{ pl: 2 }}>
                  <Grid item xs={12} sm={8}>
                    <input
                      name="jobName"
                      placeholder="직장명"
                      onChange={handleSignup}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <input
                      name="hireDate"
                      placeholder="입사년도"
                      onChange={handleSignup}
                    />
                  </Grid>
                </ListItem>
                <ListItem sx={{ pl: 3 }}>
                  <Grid item xs={12} sm={3}>
                    <span className="addInfoSpan">결혼</span>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <div className="select">
                      <input
                        type="radio"
                        id="select3"
                        name="marry"
                        value="false"
                        label="marry"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select3">미혼</label>
                      <input
                        type="radio"
                        id="select4"
                        name="marry"
                        value="true"
                        label="marry"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select4">기혼</label>
                    </div>
                  </Grid>
                </ListItem>
                <ListItem sx={{ pl: 3 }}>
                  <Grid item xs={12} sm={3}>
                    <span className="addInfoSpan">자녀</span>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <div className="select">
                      <input
                        type="radio"
                        id="select5"
                        name="hasChild"
                        value="0"
                        label="hasChild"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select5">무</label>
                      <input
                        type="radio"
                        id="select6"
                        name="hasChild"
                        value="1"
                        label="hasChild"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select6">1명</label>
                      <input
                        type="radio"
                        id="select7"
                        name="hasChild"
                        value="2"
                        label="hasChild"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select7">2명이상</label>
                    </div>
                  </Grid>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Grid>
        <Grid item xs={12} sm={8}>
          <button
            id="signUpBtn"
            onClick={signup}
            disabled={
              !(
                isPhone &&
                isBirth &&
                isPasswordConfirm &&
                isCheckId &&
                isCheckPhone &&
                member.memberName !== "" &&
                !member.memberId !== "" &&
                !member.pswd !== ""
              )
            }
          >
            회원가입
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUpForm;
