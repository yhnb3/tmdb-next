import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image'

interface Content {
  name : string,
  poster_path: string,
  id: string,
  air_date: string, 
}

interface Props {
  content: Content
}

export default function SeasonSection({ content } : Props) {
  const title = content.name;
  const posterUrl = content.poster_path
    ? `https://image.tmdb.org/t/p/w300/${content.poster_path}`
    : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
  const pathUrl = `/tv/${content.id}`;
  const date = content.air_date;
  const handlingDate = date
    ? `${parseInt(date.substring(5, 7), 10)}월 ${parseInt(
        date.substring(8, 10),
        10,
      )}, ${date.substring(0, 4)}`
    : '미정';

  if (!content.poster_path) {
    return <></>;
  }
  return (
    <div className="flex mt-5 border-gray-300 border rounded-lg">
      <Link href={pathUrl} passHref>
        <Image
          width={146.2}
          height={225}
          className="rounded-l-lg object-cover object-top"
          src={posterUrl}
          alt=""
        />
      </Link>
      <div className="grid grid-cols-1 p-5 gap-4 w-11/12">
        <div className="grid grid cols-1">
          <p className="text-2xl align-middle">{title}</p>
          <p className="text-xl text-gray-400 align-middle">{handlingDate}</p>
        </div>
      </div>
    </div>
  );
}
