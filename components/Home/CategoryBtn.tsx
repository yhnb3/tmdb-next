import * as React from 'react';

interface Props {
  categories: Array<string>,
  categoryChange: (category : string) => void,
  currentCategory: string
}
const CategoryBtn = ({
  categories,
  categoryChange,
  currentCategory,
}: Props) => {
  return (
    <div className="flex mx-2 rounded-full border border-black">
      {categories.map((category : string) => {
        return (
          <button
            className={`${currentCategory === category ? "rounded-full bg-gray-500 text-white px-5 py-1 " : ""} px-5`}
            key={category}
            onClick={() => categoryChange(category)}
            type="button"
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryBtn