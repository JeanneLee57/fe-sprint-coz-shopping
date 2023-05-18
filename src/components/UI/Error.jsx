import kuromi from "../../assets/kuromi.jpg";
import styles from "./Error.module.css";

function Error() {
  return (
    <div className={styles.error}>
      <img className={styles.kuromi} src={kuromi} alt="북마크 없음" />
      <p>없어잉...</p>
    </div>
  );
}

export default Error;
