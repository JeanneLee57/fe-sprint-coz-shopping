import Item from "../components/UI/Item";
import Types from "../components/Types";
import styles from "./ProductListPage.module.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductListPage({ bookmarkState, setBookmarkState }) {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [currentType, setCurrentType] = useState("all");

  const obsRef = useRef(null); //observer Element
  const [page, setPage] = useState(1); //현재 페이지
  const [load, setLoad] = useState(false); //로딩 스피너
  const preventRef = useRef(true); //옵저버 중복 실행 방지
  const endRef = useRef(false); //모든 글 로드 확인

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

  /* 옵저버 생성 */
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false; //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  /* 페칭 이후 보여줄 데이터 및 페이지 초기화 */
  useEffect(() => {
    setShowData(data.slice(0, 12));
    setPage(1);
  }, [data]);

  /* 타입이 바뀌면 데이터 필터하고 페이지 초기화 */
  useEffect(() => {
    setShowData(
      data
        .filter((item) =>
          currentType === "all" ? true : item.type === currentType
        )
        .slice(0, 12)
    );
    setPage(1);
  }, [currentType]);

  /* 페이지가 바뀌면 보여줄 데이터를 추가 */
  useEffect(() => {
    getPost();
  }, [page]);

  let timer = null;
  const getPost = () => {
    setLoad(true);
    if (timer) {
      clearTimeout(timeoutRef.current);
    }
    timer = setTimeout(() => {
      setShowData((prev) => [
        ...prev,
        ...data
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
      <ToastContainer
        position="bottom-right"
        limit={3}
        closeButton={true}
        autoClose={3000}
      />
      <Types currentType={currentType} setCurrentType={setCurrentType} />
      <div className={styles.itemBox}>
        {showData.map((item) => (
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
