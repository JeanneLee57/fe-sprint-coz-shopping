import BookmarkList from "./BookmarkList";
import ProductList from "./Productlist";
import styles from "./Mainpage.module.css";
import { useState } from "react";

function Mainpage() {
  const bookmark = JSON.parse(localStorage.getItem("bookmark"));
  const [bookmarkState, setBookmarkState] = useState(bookmark);

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
