import styles from "./Header.module.css";
import logo from "../assets/image1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header(prop) {
  const handleDropdown = () => {
    prop.setShowDropdown(!prop.showDropdown);
  };
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo}></img>
        <span className={styles.title}>COZ Shopping</span>
      </div>
      <span className={styles.button}></span>
      <FontAwesomeIcon
        onClick={handleDropdown}
        className={styles.button}
        size="2x"
        icon={faBars}
      />
    </div>
  );
}

export default Header;
