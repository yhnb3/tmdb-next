import * as React from 'react';

import RecomendationPoster from './RecommendationPoster';
import Slide from '../../Slide';
import useFetchData from '../../../hooks/useFetchData';

interface Props {
  id: string,
  section: string
}
const RecommendationSection: React.FC<Props> = ({ id, section } : Props) => {
  const endPoint = `https://api.themoviedb.org/3/${section}/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko&page=1`
  const { loading, error, data } = useFetchData({endPoint})
  
  if(loading) return <p>로딩중...</p>
  if(error) return <p>에러가 발생하였습니다.</p>
  return (
    <div>
      <p className="text-xl font-bold m-2">추천</p>
      {data.results.length > 0 ? <Slide Component={RecomendationPoster} contents={data.results} /> : <p className='m-2'>추천할 컨텐츠가 없습니다.</p>}
    </div>
  );
}

export default RecommendationSection