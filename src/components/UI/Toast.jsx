import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./Toast.module.css";

function Toast() {
  return (
    <div className={styles.toast}>
      <FontAwesomeIcon className={styles.star} icon={faStar} />
      북마크가 추가됐을지도..?
    </div>
  );
}

export default Toast;
