import styles from "./BookmarkList.module.css";
import Error from "./UI/Error";

function BookmarkList() {
  return (
    <>
      <h1 className={styles.title}>북마크 리스트</h1>
      <Error />
    </>
  );
}

export default BookmarkList;
