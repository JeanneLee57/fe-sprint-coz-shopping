import BookmarkList from "./BookmarkList";
import ProductList from "./Productlist";
import styles from "./Mainpage.module.css";

function Mainpage() {
  return (
    <div>
      <ProductList />
      <BookmarkList />
    </div>
  );
}

export default Mainpage;
