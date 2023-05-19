import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer>
      <div className={styles.text}>개인정보 처리방침 | 이용 약관</div>
      <div className={styles.text}>All rights reserved © Codestates</div>
    </footer>
  );
}

export default Footer;
