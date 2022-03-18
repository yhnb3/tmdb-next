import * as React from 'react'
import Image from 'next/image'

import useFetchData from '../../../hooks/useFetchData';

import Rate from '../../Rate';

import  handlingProvider  from '../utils/handlingProvider';


interface Props {
  content: {
    id: string,
    title? : string,
    name? : string,
    release_date?: string,
    first_air_date? : string,
    provider: any,
    genres: Array<{name: string}> | [],
    backdrop_path: string,
    poster_path: string,
    production_countries: Array<any>,
    vote_average: number,
    tagline: string,
    overview: string,
  } 
}
const SummarySection: React.FC<Props> = ({content} : Props) => {
  const section = content.title ? 'movie' : 'tv'
  const date = content.title ? content.release_date : content.first_air_date;
  const backdropUrl = `https://image.tmdb.org/t/p/original/${content.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w300/${content.poster_path}`;
  const title = content.title || content.name;

  const endPoint = `https://api.themoviedb.org/3/${section}/${content.id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_CODE}`
  const { loading, data, error } = useFetchData({endPoint})

  const Providers = () => {
    if (loading) return <></>
    if (error) return <></>

    const providers = handlingProvider({provider: data.results.KR})
    return <div className="flex flex-row my-2">
    {providers.map((element: { display_priority: string; logo_path: string; }) => (
      <div
        key={element.display_priority}
        className="mr-4"
      >
        <Image
          className="rounded-md mx-2"
          width={60}
          height={60}
          src={`https://www.themoviedb.org/t/p/original/${element.logo_path}`}
          alt=""
        />  
      </div>
      
    ))}
  </div>
  }
  const renderGenre = () => {
    const { genres  } = content;
    const genreString = genres.map((genre: { name: string; }) => genre.name).join(', ');
    return <span className="mx-1">{genreString}</span>;
  };

  const renderDate = () => (
    <span>
      {date.substring(0, 4)}/{date.substring(5, 7)}/{date.substring(8, 10)}
    </span>
  );

  return (
  <div className="relative h-poster">
  {content.backdrop_path ? (
    <Image
      placeholder='blur'
      blurDataURL={backdropUrl}
      layout="fill"
      className="h-poster w-full object-cover object-top z-5 opacity-50"
      src={backdropUrl}
      alt=""
    />
  ) : (
    <></>
  )}
  <div className="absolute w-full h-full bg-black opacity-75 top-0 z-10" />
  <div className="absolute h-3/4 bottom-1/8 w-full z-20">
    <div className="flex flex-row w-screen mx-auto">
      <div className="h-full">
        {content.poster_path ? (
          <Image 
            placeholder='blur'
            blurDataURL={posterUrl} 
            className="h-full rounded-lg"
            width={300} 
            height={450} 
            src={posterUrl} 
            alt="" 
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col w-2/3 px-5 text-white justify-start">
        <div className="my-2">
          <div>
            <span className="text-3xl font-bold">{title}</span>{' '}
            <span className="text-3xl text-gray-400">
              ({date.substring(0, 4)})
            </span>
          </div>
          <div className="p-1">
            {renderDate()}
            <span>({content.production_countries[0] ? content.production_countries[0].iso_3166_1 : "없음"})</span>
            {renderGenre()}
          </div>
        </div>
        <div className="h-16 relative"><Rate score={content.vote_average} times={1.5}/></div>
        <p className="text-lg italic text-gray-400 my-2">
          {content.tagline}
        </p>
        <p className="text-2xl font-bold my-2">개요</p>
        <p className="max-h-20 overflow-ellipsis overflow-hidden text-sm line-clamp-4 my-2">
          {content.overview || '해당 언어의 줄거리가 존재하지 않습니다.'}
        </p>
        <Providers />
      </div>
    </div>
  </div>
</div>)

}

export default SummarySection