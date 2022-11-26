import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
import MetaData from "../layout/MetaData";

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
      <MetaData title={`Search a Product -- ECOMMERCE`} />
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
