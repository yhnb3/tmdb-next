import { useState } from "react";

import { Poster, Slide } from "components/shared";
import CategoryBtn from "./CategoryBtn";

interface Props {
  name: string;
  title: string;
  target: string;
  datas:
    | {
        상영중: any;
        TV: any;
      }
    | {
        오늘: any;
        이번주: any;
      }
    | any;
  categories: Array<string>;
}

const ContentListContainer = ({ datas, target, categories, title }: Props) => {
  const [currentCategory, setCurrentCategory] = useState(target);
  const categoryChange = (section: string) => {
    setCurrentCategory(section);
  };
  const data =
    title === "개봉 예정 영화" ? datas.results : datas[currentCategory].results;

  return (
    <div className="my-10">
      <div className="flex flex-row my-3 px-5">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        {title === "개봉 예정 영화" ? null : (
          <CategoryBtn
            categories={categories}
            currentCategory={currentCategory}
            categoryChange={categoryChange}
          />
        )}
      </div>
      <section>
        <Slide Component={Poster} contents={data} />
      </section>
    </div>
  );
};

export default ContentListContainer;
