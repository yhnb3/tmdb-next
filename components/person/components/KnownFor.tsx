import Link from 'next/link'
import Image from 'next/image'

import useFetchData from '../../../hooks/useFetchData';

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

  const render = () =>
    sortedMovies.map((content : Content) => (
      <div className="inline-flex mb-4" key={content.title || content.name}>
        <Link href={`/${content.title ? 'movie' : 'tv'}/${content.id}`}>
          <a>
          <Image
            className="h-48 object-cover rounded-md min-w-posterImg shadow-xl mr-2 my-1"
            src={`https://image.tmdb.org/t/p/w300/${content.poster_path}`}
            alt={content.title || content.name}
          />
          </a>
        </Link>
      </div>
    ));

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold py-2">유명 분야</p>
      <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full overflow-y-hidden overflow-x-auto whitespace-nowrap">
        {render()}
      </div>
    </div>
  );
}
