import React, { useState } from 'react';

import CategoryBtn from './CategoryBtn';
import Poster from '../Poster'
import Slide from '../Slide'
import useFetchData from '../../hooks/useFetchData';
import Loading from './Loading';

interface Props {
  name: string,
  title: string,
  target: string,
  urls: {
    상영중: string,
    TV: string
  } | {
    오늘: string,
    이번주: string
  },
  categories: Array<string>,
}

const ContentListContainer = ({
  urls,
  target,
  categories,
  title,
}: Props) => {
  const [currentCategory, setCurrentCategory] = useState(target);

  const { loading, error, data } = useFetchData({
    endPoint: urls[currentCategory],
  });

  const categoryChange = (section:string) => {
    setCurrentCategory(section);
  };
  
  if (error) return <p>에러가 발생하였습니다. </p>;
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
      { loading ? <Loading /> : <Slide Component={Poster} contents={data.results} />}
    </div>
  );
}

export default ContentListContainer
