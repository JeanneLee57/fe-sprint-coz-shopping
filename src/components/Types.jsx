import Type from "./UI/Type";
import styles from "./Types.module.css";

function Types({ currentType, setCurrentType }) {
  const types = ["all", "Brand", "Category", "Product", "Exhibition"];
  return (
    <div className={styles.types}>
      {types.map((type) => (
        <Type
          type={type}
          currentType={currentType}
          setCurrentType={setCurrentType}
        />
      ))}
    </div>
  );
}

export default Types;
