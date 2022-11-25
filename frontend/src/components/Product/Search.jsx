import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

export default function Search() {
  const [keyword, setkeyword] = useState("");
  const Navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      Navigate(`/products/${keyword}`);
    } else {
      Navigate(`/products`);
    }
  };

  return (
    <Fragment>
      <form onSubmit={searchSubmitHandler} className="searchBox">
        <input
          type="text"
          placeholder="search a Product ..."
          onChange={(e) => setkeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </Fragment>
  );
}
