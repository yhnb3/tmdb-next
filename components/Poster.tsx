/* eslint-disable react/prop-types */
import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image';

import Rate from './Rate'

interface Content {
  title? : string,
  name? : string,
  poster_path: string,
  release_date: string,
  first_air_date: string,
  vote_average: number,
  id: string,
}

interface Props {
  content: Content
}
const Poster = ({ content} : Props) => {
  const title = content.title || content.name;
  const posterUrl = content.poster_path
    ? `https://image.tmdb.org/t/p/w300/${content.poster_path}`
    : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
  const pathUrl = content.title ? `/movie/${content.id}` : `/tv/${content.id}`;
  const date = content.release_date || content.first_air_date;

  const handlingDate = date
    ? `${parseInt(date.substring(5, 7), 10)}월 ${parseInt(
        date.substring(8, 10),
        10,
      )}, ${date.substring(0, 4)}`
    : '미정';


  return (
    <div className="h-list w-img">
      <div className="relative h-img w-img top-0 flex-col shadow-md rounded-lg">
        <Link href={pathUrl} passHref>
          <Image
            layout='fill'
            className="rounded-lg object-cover w-img h-full mx-auto"
            src={posterUrl}
            alt=""
          />
        </Link>
        <Rate score={content.vote_average} times={1}/>
      </div>
      <div className="mt-4">
          <p className="text-md font-bold whitespace-normal">{title}</p>
          <p className="text-sm text-gray-400">{handlingDate}</p>
        </div>
    </div>
  );
}

export default Poster
