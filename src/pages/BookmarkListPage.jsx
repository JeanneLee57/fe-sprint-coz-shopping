import Item from "../components/UI/Item";
import Types from "../components/Types";
import styles from "./ProductListPage.module.css";
import Error from "../components/UI/Error";
import { useState, useEffect, useRef, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookmarkListPage({ bookmarkState, setBookmarkState }) {
  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const [currentType, setCurrentType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const obsRef = useRef(null);

  /* 북마크된 요소인지 확인(prop 전달용) */
  const checkIsBookmarked = (item) => {
    if (bookmarkState) {
      return bookmarkState.some((x) => x.id === item.id);
    }
    return false;
  };

  /* 첫 렌더시 옵저버 생성 */
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, {
      threshold: 1.0,
    });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  /* 옵저버 콜백함수 */
  const obsHandler = (entries) => {
    setIsLoading(true);
    setTimeout(() => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
      setIsLoading(false);
    }, 500);
  };

  // useMemo
  const filteredItem = useMemo(() => {
    if (currentType === "all") {
      return bookmarkState;
    } else return bookmarkState.filter((item) => item.type === currentType);
  }, [currentType, bookmarkState]);

  return (
    <div className={styles.mainbox}>
      <ToastContainer
        position="bottom-right"
        limit={3}
        closeButton={true}
        autoClose={3000}
      />
      <Types currentType={currentType} setCurrentType={setCurrentType} />
      <>
        {" "}
        <div className={styles.itemBox}>
          {bookmarkState && bookmarkState.length !== 0 ? (
            filteredItem
              .slice(0, ITEMS_PER_PAGE * page)
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
        {isLoading && (
          <div className={styles.ldsring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {page < Math.ceil(filteredItem.length / ITEMS_PER_PAGE) && (
          <div ref={obsRef}></div>
        )}
      </>
    </div>
  );
}

export default BookmarkListPage;
