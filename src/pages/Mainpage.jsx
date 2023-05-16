import BookmarkList from "../components/BookmarkList";
import ProductList from "../components/Productlist";
import Toast from "../components/UI/Toast";
import styles from "./Mainpage.module.css";
import { useState, useEffect } from "react";

function Mainpage({ bookmarkState, setBookmarkState }) {
  const [showToast, setShowToast] = useState(false);
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
      {showToast && <Toast />}
    </div>
  );
}

export default Mainpage;
