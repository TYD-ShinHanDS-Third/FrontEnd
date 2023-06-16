import React, { useState } from "react";
import "../../css/loan/LoanUploadDoc.css";
import { Link } from "react-router-dom";

function LoanUploadDoc(props) {
  const [filelist, setFilelist] = useState({
    file1: "",
    file2: "",
    file3: "",
    file4: "",
    file5: "",
  });

  const printFileName = (e) => {
    console.log(e);
    var filename = e.target.value;
    var fileindex = e.target.name;

    var filename_list = filename.split("\\");
    filename = filename_list.slice(-1);

    var tmplist = { ...filelist };
    tmplist[fileindex] = filename;

    setFilelist(tmplist);
    console.log(filelist.file1);
  };
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
              class="upload-name"
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
              class="upload-name"
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
              class="upload-name"
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
              class="upload-name"
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
        <Link to="/hows/loan/detail/consult/success">
          <button className="finalapply_btn">신청하기</button>
        </Link>
      </div>
    </div>
  );
}

export default LoanUploadDoc;
