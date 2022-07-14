import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading__container}>
      <div className={styles.loading__indicator} />
    </div>
  );
};

export default Loading;
