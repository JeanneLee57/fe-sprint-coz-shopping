import BookmarkList from "../components/BookmarkList";
import ProductList from "../components/Productlist";
import Toast from "../components/UI/Toast";
import styles from "./Mainpage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

function Mainpage({ bookmarkState, setBookmarkState }) {
  const [showToast, setShowToast] = useState(true);

  return (
    <div>
      <div>
        <ToastContainer
          position="bottom-right"
          limit={3}
          closeButton={true}
          autoClose={3000}
        />
      </div>
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
