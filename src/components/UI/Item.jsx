import styles from "./Item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const Item = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.imgBox}>
        <img
          className={styles.image}
          src={item.image_url ? item.image_url : item.brand_image_url}
        />
      </div>
      <div className={styles.detail}>
        {
          <h1 className={styles.title}>
            {item.title ? item.title : item.brand_name}
          </h1>
        }
        {item.type === "Brand" ? (
          <span className={styles.brand}>관심고객수</span>
        ) : item.type === "Product" ? (
          <span className={styles.discount}>{item.discountPercentage}%</span>
        ) : (
          ""
        )}
      </div>
      <div className={styles.detail}>
        <span></span>
        <span className={styles.numbers}>
          {item.type === "Product"
            ? `${item.price}원`
            : item.type === "Brand"
            ? item.follower
            : ""}
        </span>
      </div>
    </div>
  );
};

export default Item;
