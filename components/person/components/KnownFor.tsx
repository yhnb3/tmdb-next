import Link from 'next/link'
import Image from 'next/image'

import useFetchData from '../../../hooks/useFetchData';
import Slide from '../../Slide';

interface Props {
  id: string,
  department: string,
}

interface Content {
  title?: string, name? : string, id: string, poster_path: string
}

export default function KnowFor({ id, department } : Props) {
  const endPoint = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`;
  const { loading, error, data } = useFetchData({ endPoint });

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러가 발생하였습니다.</p>;

  const movies = department === 'Acting' ? data.cast : data.crew;
  const usableMovies = movies.map((content : Content) => content);
  const sortedMovies = usableMovies
    .sort((a: {vote_count: number}, b : {vote_count: number}) => b.vote_count - a.vote_count)
    .slice(0, 8);
  
  
  function Poster ({content} : {content: Content}){
    return (
    <Link  href={`/${content.title ? 'movie' : 'tv'}/${content.id}`}>
      <a>
        <Image
          width={130}
          height={195}
          objectFit='cover'
          className="rounded-md shadow-xl"
          src={`https://image.tmdb.org/t/p/w300/${content.poster_path}`}
          alt={content.title || content.name}
        />
      </a>
    </Link>)
  }

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold py-2">유명 분야</p>
      <Slide Component={Poster} contents={sortedMovies} />
    </div>
  );
}
