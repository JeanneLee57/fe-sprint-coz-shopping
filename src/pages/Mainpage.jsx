import BookmarkList from "../components/BookmarkList";
import ProductList from "../components/ProductList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Mainpage({ bookmarkState, setBookmarkState }) {
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
