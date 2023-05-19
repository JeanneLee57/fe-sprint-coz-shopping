import styles from "./Header.module.css";
import logo from "../assets/main-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Header({ showDropdown, setShowDropdown }) {
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <header className={styles.header}>
      {" "}
      <Link to="/">
        <div className={styles.wrapper}>
          <img className={styles.logo} src={logo} alt="로고" />{" "}
          <span className={styles.title}>COZ Shopping</span>{" "}
        </div>{" "}
      </Link>
      <span className={styles.button}></span>
      <FontAwesomeIcon
        onClick={handleDropdown}
        className={styles.button}
        size="2x"
        icon={faBars}
      />
    </header>
  );
}

export default Header;
