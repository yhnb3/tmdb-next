import React, { useState } from 'react';

import CategoryBtn from './CategoryBtn';
import Poster from '../Poster'
import Slide from '../Slide'

interface Props {
  name: string,
  title: string,
  target: string,
  datas: {
    상영중: any,
    TV: any
  } | {
    오늘: any,
    이번주: any
  },
  categories: Array<string>,
}

const ContentListContainer = ({
  datas,
  target,
  categories,
  title,
}: Props) => {
  const [currentCategory, setCurrentCategory] = useState(target);

  console.log(datas[currentCategory])
  const categoryChange = (section:string) => {
    setCurrentCategory(section);
  };
  
  return (
    <div>
      <div className="flex flex-row my-3 px-5">
        <div className="flex items-center">
          <p className="font-bold">{title}</p>
        </div>
        <CategoryBtn
          categories={categories}
          currentCategory={currentCategory}
          categoryChange={categoryChange}
        />
      </div>
      <Slide Component={Poster} contents={datas[currentCategory].results} />
    </div>
  );
}

export default ContentListContainer
