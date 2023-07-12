import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <p>{"Logo"}</p>
        <input className="searchBox" type="text" placeholder="Search" />
      </div>
    </header>
  );
};

export default Header;
