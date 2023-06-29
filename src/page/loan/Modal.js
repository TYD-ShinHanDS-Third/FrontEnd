import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";

function Modal({ loanname, bankname, consult }) {
  const [isOpen, setIsOpen] = useState(false);

  const [identify, setIdentify] = useState({ name: "", jumin: "", money: 0 });
  const [isCheckIdf, setIsCheckIdf] = useState(false);

  const [idfMessage, setIdfMessage] = useState("본인 인증을 진행해주세요.");

  const handleModal = (e) => {
    setIdentify({ ...identify, [e.target.name]: e.target.value });
  };

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
    setIdentify({ name: "", jumin: "", money: 0 });
  };

  //본인인증
  const identifyVer = () => {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    const url = "/hows/loan/verification";

    axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          token: token,
        },
        params: {
          name: identify.name,
          jumin: identify.jumin,
          price: identify.money,
        },
      })
      .then(function (response) {
        if (response.data == "1") {
          setIsCheckIdf(true);
          setIdfMessage("본인 인증 완료");
        } else {
          setIdfMessage("본인 인증 실패. 다시 시도해주세요.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <ModalContainer>
        <LimitButton onClick={openModalHandler}>한도조회</LimitButton>
        {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
        {isOpen ? (
          <ModalBackdrop onClick={openModalHandler}>
            {/* event 버블링을 막는 메소드 */}
            <ModalView onClick={(e) => e.stopPropagation()}>
              <ExitBtn onClick={openModalHandler}>x</ExitBtn>
              <h3>
                [{bankname}] {loanname}
              </h3>
              <h3>본인인증 이후 한도조회가 가능합니다 : ) </h3>
              <div className="desc">
                이름
                <input type="text" name="name" onChange={handleModal} />
                주민등록번호
                <input type="text" name="jumin" onChange={handleModal} />
                <br />
                {identify.jumin !== null && (
                  <span
                    className={`message ${isCheckIdf ? "success" : "error"}`}
                  >
                    {idfMessage}
                  </span>
                )}
                <br />
                대출 금액
                <input type="number" name="money" onChange={handleModal} />
              </div>
              <div style={{ display: "flex" }}>
                <OKBtn onClick={identifyVer} disabled={isCheckIdf}>
                  본인 인증
                </OKBtn>
                <Link
                  to="/hows/loan/detail/limit/loading"
                  state={{
                    loanname: loanname,
                    bankname: bankname,
                    jumin: identify.jumin,
                    consult: consult,
                    price: identify.money,
                  }}
                >
                  <OKBtn disabled={!isCheckIdf}>확인</OKBtn>
                </Link>
              </div>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
}

export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ExitBtn = styled(ModalBtn)`
  background-color: #edf1d6;
  color: black;
  border-radius: 10px;
  text-decoration: none;
  margin: 10px;
  padding: 5px 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OKBtn = styled(ModalBtn)`
  background-color: #edf1d6;
  color: black;
  border-radius: 10px;
  text-decoration: none;
  margin: 10px;
  padding: 5px 10px;
  width: 80px;
  height: 40px;
  align-items: center;
`;

export const LimitButton = styled.button`
  background-color: #fffedd;
  height: fit-content;
  width: fit-content;
`;

export const ModalView = styled.div.attrs(() => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: "dialog",
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 500px;
  heigth: 200px;
  background-color: #ffffff;
  > div.desc {
    margin: 50px;
    font-size: 20px;
    color: var(--coz-purple-600);
  }
`;
export default Modal;
