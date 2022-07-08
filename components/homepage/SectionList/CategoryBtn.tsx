import { MouseEvent } from "react";

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
  return (
    <div className="flex mx-2 rounded-full border border-black h-8">
      {categories.map((category: string) => {
        return (
          <button
            className={`${
              currentCategory === category
                ? "rounded-full bg-black text-white px-5 py-1 "
                : ""
            } px-5`}
            key={category}
            data-category={category}
            onClick={onClick}
            type="button"
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryBtn;
