import Item from "../components/UI/Item";
import Types from "../components/Types";
import styles from "./ProductListPage.module.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function ProductListPage({ bookmarkState, setBookmarkState }) {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [currentType, setCurrentType] = useState("all");

  const checkIsBookmarked = (item) => {
    if (bookmarkState) {
      return bookmarkState.some((x) => x.id === item.id);
    }
    return false;
  };

  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products", {
        method: "GET",
      })
      .then((res) => {
        setData(res.data);
      })
      .then(() => {
        const observer = new IntersectionObserver(obsHandler, {
          threshold: 1.0,
        });
        if (obsRef.current) observer.observe(obsRef.current);
        return () => {
          observer.disconnect();
        };
      });
  }, []);

  useEffect(() => {
    setShowData(data.slice(0, 12));
  }, [data]);

  /* 무한 스크롤 구현 */
  const obsRef = useRef(null); //observer Element
  const [page, setPage] = useState(1); //현재 페이지
  const [load, setLoad] = useState(false); //로딩 스피너
  const preventRef = useRef(true); //옵저버 중복 실행 방지
  const endRef = useRef(false); //모든 글 로드 확인

  useEffect(() => {
    console.log(page);
    getPost();
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
      setShowData((prev) => [
        ...prev,
        ...data.slice((page - 1) * 12, page * 12),
      ]);
      preventRef.current = true;
      setLoad(false);
    }, 1000);
  };

  return (
    <div className={styles.mainbox}>
      <Types currentType={currentType} setCurrentType={setCurrentType} />
      <div className={styles.itemBox}>
        {showData
          .filter((item) =>
            currentType === "all" ? true : item.type === currentType
          )
          .map((item) => (
            <Item
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
    </div>
  );
}

export default ProductListPage;
