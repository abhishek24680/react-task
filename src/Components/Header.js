import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      <div className="container">
        <p>{"Logo"}</p>
        <input
          value={props.value}
          className="searchBox"
          onChange={props.searchFn}
          type="text"
          placeholder="Search"
        />
      </div>
    </header>
  );
};

export default Header;
