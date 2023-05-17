import styles from "./Type.module.css";
import all from "../../assets/types_img/type_all.png";
import brand from "../../assets/types_img/type_brand.png";
import category from "../../assets/types_img/type_category.png";
import product from "../../assets/types_img/type_product.png";
import special from "../../assets/types_img/type_special.png";

function Type({ type, currentType, setCurrentType }) {
  let imgSrc;
  let title;
  switch (type) {
    case "all":
      imgSrc = all;
      title = "전체";
      break;
    case "Brand":
      imgSrc = brand;
      title = "브랜드";
      break;
    case "Category":
      imgSrc = category;
      title = "카테고리";
      break;
    case "Product":
      imgSrc = product;
      title = "상품";
      break;
    case "Exhibition":
      imgSrc = special;
      title = "기획전";
      break;
    default:
      imgSrc = all;
      title = "전체";
      break;
  }

  const handleClick = () => {
    setCurrentType(type);
  };

  return (
    <div className={styles.typeBox} onClick={handleClick}>
      <img src={imgSrc} alt={type} />
      <div className={currentType === type ? styles.colored : styles.title}>
        {title}
      </div>
    </div>
  );
}

export default Type;
