import styles from "./Item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Item = ({ item, setBookmarkState, isBookmarked }) => {
  const handleBookmark = () => {
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
  };

  return (
    <div className={styles.item}>
      <div className={styles.imgBox}>
        <img
          className={styles.image}
          src={item.image_url ? item.image_url : item.brand_image_url}
        />
        <FontAwesomeIcon
          className={isBookmarked ? styles.yellowstar : styles.star}
          size="lg"
          icon={faStar}
          onClick={() => {
            handleBookmark();
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
  );
};

export default Item;
