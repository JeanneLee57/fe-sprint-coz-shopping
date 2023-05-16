import Item from "../components/UI/Item";
import Types from "../components/Types";
import styles from "./ProductListPage.module.css";
import { useState, useEffect, useRef } from "react";

function BookmarkListPage({ bookmarkState, setBookmarkState }) {
  const [showData, setShowData] = useState([]);
  const [currentType, setCurrentType] = useState("all");

  const obsRef = useRef(null); //observer Element
  const [page, setPage] = useState(1); //현재 페이지
  const [load, setLoad] = useState(false); //로딩 스피너
  const preventRef = useRef(true); //옵저버 중복 실행 방지
  const endRef = useRef(false); //모든 글 로드 확인

  /* 북마크된 요소인지 확인(prop 전달용) */
  const checkIsBookmarked = (item) => {
    if (bookmarkState) {
      return bookmarkState.some((x) => x.id === item.id);
    }
    return false;
  };

  /* 화면에 표시할 데이터를 업데이트 */
  const updateShowData = (start, end) => {
    setShowData(
      bookmarkState
        .filter((item) =>
          currentType === "all" ? true : item.type === currentType
        )
        .slice(start, end)
    );
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
    const target = entries[0];
    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false; //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  /* 데이터를 삭제하면 보여줄 데이터를 재설정 */
  useEffect(() => {
    updateShowData(0, page * 12);
  }, [bookmarkState]);

  /* 타입을 변경하면 보여줄 데이터를 재설정하고 페이지 초기화 */
  useEffect(() => {
    updateShowData(0, 12);
    setPage(1);
  }, [currentType]);

  /* 페이지 변경시 보여줄 데이터를 재설정 */
  useEffect(() => {
    if (page !== 1) getPost();
  }, [page]);

  let timer = null;
  const getPost = () => {
    setLoad(true);
    // 이전에 예약된 setTimeout이 있으면 취소
    if (timer) {
      clearTimeout(timeoutRef.current);
    }
    // 1초 후에 setShowData를 실행하는 setTimeout 예약
    timer = setTimeout(() => {
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
