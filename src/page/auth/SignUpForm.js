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
import React from "react";

function SignUpForm(props) {
  const [bank, setBank] = React.useState("");

  const bankChange = (event) => {
    setBank(event.target.value);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const checkId = (event) => {
    //
  };
  const checkPhone = (event) => {
    //
  };
  return (
    <div>
      <img className="logoSignup" src="../../image/Logo.svg" alt="hows" />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={8}>
          <input id="memberName" name="memberName" placeholder="이름" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <input id="memberId" name="memberId" placeholder="아이디" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <button onClick={checkId}>중복체크</button>
        </Grid>
        <Grid item xs={12} sm={8}>
          <input id="pswd" name="pswd" placeholder="비밀번호" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <input id="pswdChk" name="pswdChk" placeholder="비밀번호 확인" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <span>확인</span>
        </Grid>
        <Grid item xs={12} sm={8}>
          <input id="bDay" name="bDay" placeholder="생년월일" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <input id="phone" name="phone" placeholder="전화번호" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <button onClick={checkPhone}>전화번호 인증</button>
        </Grid>
        <Grid item xs={12} sm={8}>
          <List
            sx={{
              width: "100%",
              maxWidth: "600px",
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
                    <input name="accNo" placeholder="계좌번호" />
                  </Grid>
                </ListItem>
                <ListItem sx={{ pl: 3 }}>
                  <Grid item xs={12} sm={3}>
                    <span>직장유무</span>
                  </Grid>
                  <Grid item xs={12} sm={8}>
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
                  </Grid>
                </ListItem>
                <ListItem sx={{ pl: 2 }}>
                  <Grid item xs={12} sm={8}>
                    <input name="jobName" placeholder="직장명" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <input name="jobName" placeholder="입사년도" />
                  </Grid>
                </ListItem>
                <ListItem sx={{ pl: 3 }}>
                  <Grid item xs={12} sm={3}>
                    <span>결혼</span>
                  </Grid>
                  <Grid item xs={12} sm={8}>
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
                  </Grid>
                </ListItem>
                <ListItem sx={{ pl: 3 }}>
                  <Grid item xs={12} sm={3}>
                    <span>자녀</span>
                  </Grid>
                  <Grid item xs={12} sm={8}>
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
                  </Grid>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Grid>
        <Grid item xs={12} sm={8}>
          <button id="signUpBtn">회원가입</button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUpForm;
