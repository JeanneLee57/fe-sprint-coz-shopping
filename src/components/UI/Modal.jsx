import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import classes from "./Modal.module.css";

const Modal = ({
  imageUrl,
  handleModalClose,
  title,
  willBookmarked,
  setWillBookmarked,
}) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleModalClose();
    }
  };
  const handleModalBookmark = () => {
    setWillBookmarked((prev) => !prev);
  };

  return (
    <div className={classes.modalOverlay} onClick={handleOverlayClick}>
      <div className={classes.modal}>
        <FontAwesomeIcon
          className={classes.close}
          icon={faX}
          size="lg"
          color="white"
          onClick={handleModalClose}
        />
        <img className={classes.img} src={imageUrl} alt="상품 이미지" />
        <span className={classes.title}>{title}</span>
        <FontAwesomeIcon
          className={willBookmarked ? classes.bookcolor : classes.bookmark}
          size="lg"
          icon={faStar}
          onClick={handleModalBookmark}
        />
      </div>
    </div>
  );
};

export default Modal;
