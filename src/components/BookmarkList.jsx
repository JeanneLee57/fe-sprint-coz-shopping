import styles from "./BookmarkList.module.css";
import Item from "./UI/Item";
import Error from "./UI/Error";
import { useState } from "react";

function BookmarkList({ bookmarkState, setBookmarkState }) {
  const ITEMS_PER_DIV = 4;
  const checkIsBookmarked = (item) => {
    if (bookmarkState) {
      return bookmarkState.some((x) => x.id === item.id);
    }
    return false;
  };
  return (
    <div className={styles.mainbox}>
      <h1 className={styles.title}>북마크 리스트</h1>
      <div className={styles.listWrapper}>
        {bookmarkState && bookmarkState.length !== 0 ? (
          bookmarkState
            .slice(0, ITEMS_PER_DIV)
            .map((item) => (
              <Item
                key={item.id}
                item={item}
                isBookmarked={checkIsBookmarked(item)}
                bookmarkState={bookmarkState}
                setBookmarkState={setBookmarkState}
              />
            ))
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default BookmarkList;
