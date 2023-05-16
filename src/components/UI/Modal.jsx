import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import classes from "./Modal.module.css";

const Modal = ({
  imageUrl,
  handleModalClose,
  isBookmarked,
  handleBookmark,
  title,
  willBookmarked,
  setWillBookmarked,
}) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleModalClose();
    }
  };
  const handelModalBookmark = () => {
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
        <img className={classes.img} src={imageUrl} alt="modalImg" />
        <span className={classes.title}>{title}</span>
        <FontAwesomeIcon
          className={willBookmarked ? classes.bookcolor : classes.bookmark}
          size="lg"
          icon={faStar}
          onClick={handelModalBookmark}
        />
      </div>
    </div>
  );
};

export default Modal;
