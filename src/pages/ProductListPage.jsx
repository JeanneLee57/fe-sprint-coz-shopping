import Item from "../components/UI/Item";
import Types from "../components/Types";
import styles from "./ProductListPage.module.css";
import { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductListPage({ bookmarkState, setBookmarkState }) {
  const [data, setData] = useState([]);
  const [currentType, setCurrentType] = useState("all");
  //const [endPage, setEndPage] = useState(0);
  const ITEMS_PER_PAGE = 12;
  const obsRef = useRef(null); //observer Element
  const [page, setPage] = useState(1); //현재 페이지
  const [isLoading, setIsLoading] = useState(false);

  const checkIsBookmarked = (item) => {
    if (bookmarkState) {
      return bookmarkState.some((x) => x.id === item.id);
    }
    return false;
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://cozshopping.codestates-seb.link/api/v1/products"
      );
      setData(response.data);
    };
    getData();
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
    //console.log(endPage);
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
      return data;
    } else return data.filter((item) => item.type === currentType);
  }, [currentType, data]);

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
        {filteredItem.slice(0, ITEMS_PER_PAGE * page).map((item) => (
          <Item
            key={item.id}
            item={item}
            isBookmarked={checkIsBookmarked(item)}
            bookmarkState={bookmarkState}
            setBookmarkState={setBookmarkState}
          />
        ))}
      </div>
      {isLoading && (
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
