import styles from "./Item.module.css";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Item = ({ item, setBookmarkState, isBookmarked }) => {
  const [modalState, setModalState] = useState(false);
  const [willBookmarked, setWillBookmarked] = useState(false);
  const notifyBookmark = () => toast("상품이 북마크에 추가되었을지도..?");
  const notifyDeleteBookmark = () => toast("상품이 북마크에 삭제되었을지도..?");

  const handleModalOpen = () => {
    setModalState(true);
    setWillBookmarked(isBookmarked);
  };
  const handleModalClose = () => {
    if (isBookmarked && !willBookmarked) {
      const bookmark = JSON.parse(localStorage.getItem("bookmark"));
      const existingItemIndex = bookmark.findIndex((x) => x.id === item.id);
      bookmark.splice(existingItemIndex, 1);
      localStorage.setItem("bookmark", JSON.stringify(bookmark));
      setBookmarkState(JSON.parse(localStorage.getItem("bookmark")));
    }
    if (!isBookmarked && willBookmarked) {
      const bookmark = JSON.parse(localStorage.getItem("bookmark")) || [];
      bookmark.unshift(item);
      localStorage.setItem("bookmark", JSON.stringify(bookmark));
      setBookmarkState(JSON.parse(localStorage.getItem("bookmark")));
    }
    setModalState(false);
  };

  const handleBookmark = (e, item) => {
    const bookmark = JSON.parse(localStorage.getItem("bookmark")) || [];
    const existingItemIndex = bookmark.findIndex((x) => x.id === item.id);
    const isExistingItem = existingItemIndex !== -1;

    if (isExistingItem) {
      bookmark.splice(existingItemIndex, 1);
    } else {
      bookmark.unshift(item);
    }

    localStorage.setItem("bookmark", JSON.stringify(bookmark));
    setBookmarkState(JSON.parse(localStorage.getItem("bookmark")));
    isBookmarked ? notifyDeleteBookmark() : notifyBookmark();
  };

  return (
    <>
      {modalState && (
        <Modal
          imageUrl={item.image_url || item.brand_image_url}
          handleModalClose={handleModalClose}
          title={item.title || item.brand_name}
          willBookmarked={willBookmarked}
          setWillBookmarked={setWillBookmarked}
        />
      )}
      <div className={styles.item}>
        <div className={styles.imgBox}>
          <img
            className={styles.image}
            src={item.image_url ? item.image_url : item.brand_image_url}
            onClick={handleModalOpen}
          />
          <FontAwesomeIcon
            className={isBookmarked ? styles.yellowstar : styles.star}
            size="lg"
            icon={faStar}
            onClick={(e) => {
              handleBookmark(e, item);
            }}
          />
        </div>
        <div className={styles.detail}>
          {
            <h1 className={styles.title}>
              {item.title ? item.title : item.brand_name}
            </h1>
          }
          {(() => {
            switch (item.type) {
              case "Brand":
                return <span className={styles.brand}>관심고객수</span>;
              case "Product":
                return (
                  <span className={styles.discount}>
                    {item.discountPercentage}%
                  </span>
                );
              default:
                return "";
            }
          })()}
        </div>
        <div className={styles.detail}>
          <span>{item.sub_title ? item.sub_title : ""}</span>
          <span className={styles.numbers}>
            {(() => {
              switch (item.type) {
                case "Product":
                  return `${item.price
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`;
                case "Brand":
                  return item.follower
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                default:
                  return "";
              }
            })()}
          </span>
        </div>
      </div>
    </>
  );
};

export default Item;
