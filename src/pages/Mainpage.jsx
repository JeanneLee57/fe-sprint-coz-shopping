import BookmarkList from "../components/BookmarkList";
import ProductList from "../components/Productlist";
import styles from "./Mainpage.module.css";
import { useState } from "react";

function Mainpage({ bookmarkState, setBookmarkState }) {
  return (
    <div>
      <ProductList
        bookmarkState={bookmarkState}
        setBookmarkState={setBookmarkState}
      />
      <BookmarkList
        bookmarkState={bookmarkState}
        setBookmarkState={setBookmarkState}
      />
    </div>
  );
}

export default Mainpage;
