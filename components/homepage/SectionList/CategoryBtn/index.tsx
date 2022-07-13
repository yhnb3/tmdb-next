import { MouseEvent } from "react";

import cx from "classnames";
import styles from "./categoryBtn.module.scss";

interface Props {
  categories: Array<string>;
  categoryChange: (category: string) => void;
  currentCategory: string;
}
const CategoryBtn = ({
  categories,
  categoryChange,
  currentCategory,
}: Props) => {
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { category } = event.currentTarget.dataset;
    categoryChange(category);
  };

  const togglePosition = categories.findIndex(
    (category) => category === currentCategory
  );

  return (
    <div className={styles.toggle__container}>
      {categories.map((category, idx) => (
        <button
          key={category}
          onClick={onClick}
          data-category={category}
          className={cx(styles.toggle__button, {
            [styles.selected]: togglePosition === idx,
          })}
        >
          {category}
        </button>
      ))}
      <div
        className={cx(styles.toggle__select, {
          [styles.right]: togglePosition === 1,
        })}
      />
    </div>
  );
};

export default CategoryBtn;
