import React, { useRef, useState } from "react";
import "../../css/loan/LoanUploadDoc.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

function LoanUploadDoc(props) {
  const [filelist, setFilelist] = useState({
    file1: "",
    file2: "",
    file3: "",
    file4: "",
    file5: "",
  });
  const [files, setFiles] = useState([]);

  const printFileName = (e) => {
    setFiles((files) => [...files, e.target.files[0]]);

    var filename = e.target.value; // 파일 주소
    var fileindex = e.target.name; // 파일 인덱스

    //파일 확장자 관리
    const fileType = e.target.value.split(".").pop();
    if (
      !["jpeg", "png", "jpg", "JPG", "PNG", "JPEG", "pdf", "PDF"].includes(
        fileType
      )
    ) {
      alert("jpg, png, jpg, pdf 파일만 업로드가 가능합니다.");
      return;
    }

    // 파일 이름만 분리 출력
    var filename_list = filename.split("\\");
    filename = filename_list.slice(-1);
    var tmplist = { ...filelist };
    tmplist[fileindex] = filename;
    setFilelist(tmplist);
  };

  async function submitFile(e) {
    const formData = new FormData();
    for (let a in files) {
      formData.append("files", files[a]);
    }
    console.log(formData.getAll("files"));
    console.log(formData);

    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/loan/detail/uploaddocs";
    await axios
      .post(listurl, formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
        params: {
          formData,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="uplods">
      <div className="files">
        <div className="file1 file">
          <h2 className="filename">
            주민등록 등본 :
            <input
              className="upload-name"
              value={filelist.file1}
              placeholder="첨부파일"
            ></input>
          </h2>
          <label for="file1" name="file1" className="upload_user_btn">
            파일 찾기
          </label>
          <input type="file" id="file1" name="file1" onChange={printFileName} />
        </div>
        <div className="file2 file">
          <h2 className="filename">
            확정 일자부 임대차 계약서 :
            <input
              className="upload-name"
              value={filelist.file2}
              placeholder="첨부파일"
              name="file2"
            ></input>
          </h2>
          <label for="file2" className="upload_user_btn">
            파일 찾기
          </label>
          <input type="file" id="file2" name="file2" onChange={printFileName} />
        </div>
        <div className="file3 file">
          <h2 className="filename">
            임차주택 건물 등기부등본 :
            <input
              className="upload-name"
              value={filelist.file3}
              placeholder="첨부파일"
              name="file3"
            ></input>
          </h2>
          <label for="file3" className="upload_user_btn">
            파일 찾기
          </label>
          <input type="file" id="file3" name="file3" onChange={printFileName} />
        </div>
        <div className="file4 file">
          <h2 className="filename">
            결혼예정 증빙 서류 :
            <input
              className="upload-name"
              value={filelist.file4}
              placeholder="첨부파일"
              name="file4"
            ></input>
          </h2>
          <label for="file4" className="upload_user_btn">
            파일 찾기
          </label>
          <input type="file" id="file4" name="file4" onChange={printFileName} />
        </div>
        <div className="file5 file">
          <h2 className="filename">
            근로자 | 건강보험 자격 실득 확인서 :
            <input
              className="upload-name"
              value={filelist.file5}
              placeholder="첨부파일"
              name="file5"
            ></input>
          </h2>
          <label for="file5" className="upload_user_btn">
            파일 찾기
          </label>
          <input type="file" id="file5" name="file5" onChange={printFileName} />
        </div>
      </div>

      <div className="loanapplybtn">
        <div className="file_desc">
          <p>
            지정된 서류가 맞는지 다시 확인 부탁드립니다. <br />
            서류 확인 후 심사까지는 최소 3~4일까지 소요됩니다. <br />
            심사 후 결과는 핸드폰 번호로 안내될 예정입니다.
          </p>
        </div>
        {/* <Link to="/hows/loan/detail/consult/success"> */}
        <button className="finalapply_btn" onClick={() => submitFile()}>
          신청하기
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default LoanUploadDoc;
