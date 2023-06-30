import React from "react";
import styled from "styled-components";

function Modal({ setModalOpen, loanname, bankname, state }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ModalContainer>
        {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}

        <ModalBackdrop>
          {/* event 버블링을 막는 메소드 */}
          <ModalView onClick={(e) => e.stopPropagation()}>
            <ExitBtn onClick={closeModal}>x</ExitBtn>
            <h3>
              [{bankname}] {loanname}
            </h3>

            <img
              src={
                state === "상담신청"
                  ? "/image/loanstate/state1.svg"
                  : state === "대출상담완료"
                  ? "/image/loanstate/state2.svg"
                  : state === "대출심사대기"
                  ? "/image/loanstate/state3.svg"
                  : state === "대출승인대기"
                  ? "/image/loanstate/state4.svg"
                  : state === "대출승인완료"
                  ? "/image/loanstate/state5.svg"
                  : state === "대출심사 부적격"
                  ? "/image/loanstate/state6.svg"
                  : ""
              }
              alt="loanstate"
              width={"500px"}
              style={{ marginBottom: "20px" }}
            />
          </ModalView>
        </ModalBackdrop>
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
  z-index: 5; //위치지정 요소
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
  width: 100px;
  border-radius: 10px;
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
