import React from "react";

function SearchAddress(props) {
  return (
    <div className="searchHeader">
      <div className="searchTitle">
        <h3>행복주택 검색하기</h3>
      </div>
      <div className="searchInput">
        <input type="text" className="search" onChange={handleInput} />
        <button className="searchLocationbtn" onClick={() => searchLocation()}>
          주소검색
        </button>
      </div>
    </div>
  );
}

export default SearchAddress;
