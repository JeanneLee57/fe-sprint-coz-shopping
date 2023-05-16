import Item from "../components/UI/Item";
import Types from "../components/Types";
import styles from "./ProductListPage.module.css";
import { useState, useEffect, useRef } from "react";

function BookmarkListPage({ bookmarkState, setBookmarkState }) {
  const [showData, setShowData] = useState([]);
  const [currentType, setCurrentType] = useState("all");

  const checkIsBookmarked = (item) => {
    if (bookmarkState) {
      return bookmarkState.some((x) => x.id === item.id);
    }
    return false;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, {
      threshold: 1.0,
    });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("첫 실행 " + page + "페이지");
    setShowData(
      bookmarkState.filter((item) =>
        currentType === "all" ? true : item.type === currentType
      )
    );
  }, [bookmarkState]);

  /* 무한 스크롤 구현 */
  const obsRef = useRef(null); //observer Element
  const [page, setPage] = useState(1); //현재 페이지
  const [load, setLoad] = useState(false); //로딩 스피너
  const preventRef = useRef(true); //옵저버 중복 실행 방지
  const endRef = useRef(false); //모든 글 로드 확인

  useEffect(() => {
    setShowData(
      bookmarkState
        .filter((item) =>
          currentType === "all" ? true : item.type === currentType
        )
        .slice(0, 12)
    );
    setPage(1);
  }, [currentType]);

  useEffect(() => {
    if (page !== 1) getPost();
  }, [page]);

  const obsHandler = (entries) => {
    //옵저버 콜백함수
    const target = entries[0];
    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false; //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  const timeoutRef = useRef(null);

  const getPost = () => {
    setLoad(true);
    // 이전에 예약된 setTimeout이 있으면 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // 1초 후에 setShowData를 실행하는 setTimeout 예약
    timeoutRef.current = setTimeout(() => {
      console.log("재실행 " + page + "페이지");
      setShowData((prev) => [
        ...prev,
        ...bookmarkState
          .filter((item) =>
            currentType === "all" ? true : item.type === currentType
          )
          .slice((page - 1) * 12, page * 12),
      ]);
      preventRef.current = true;
      setLoad(false);
    }, 1000);
  };

  return (
    <div className={styles.mainbox}>
      <Types currentType={currentType} setCurrentType={setCurrentType} />
      <>
        {" "}
        <div className={styles.itemBox}>
          {showData.map((item) => (
            <Item
              key={item.id_ + "_" + Math.random()}
              item={item}
              isBookmarked={checkIsBookmarked(item)}
              bookmarkState={bookmarkState}
              setBookmarkState={setBookmarkState}
            />
          ))}
        </div>
        {load && (
          <div className={styles.ldsring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        <div ref={obsRef}></div>
      </>
    </div>
  );
}

export default BookmarkListPage;
