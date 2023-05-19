import styles from "./Item.module.css";

function Detail({ item }) {
  return (
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
  );
}

export default Detail;
