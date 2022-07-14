import ErrorIcon from "./ErrorIcon";
import styles from "./noResult.module.scss";

const NoResult = () => {
  return (
    <div className={styles.noResult__container}>
      <ErrorIcon />
      <p className={styles.noResult__content}>검색 결과가 없습니다.</p>
    </div>
  );
};

export default NoResult;
