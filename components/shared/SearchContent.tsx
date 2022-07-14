import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Content {
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  id: string;
  overview: string;
}

interface Props {
  content: Content;
}

const SearchContent = ({ content }: Props) => {
  const title = content.title || content.name;
  const posterUrl = content.poster_path
    ? `https://image.tmdb.org/t/p/w300${content.poster_path}`
    : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
  const pathUrl = content.title ? `/movie/${content.id}` : `/tv/${content.id}`;
  const date = content.release_date || content.first_air_date;
  const handlingDate = date
    ? `${parseInt(date.substring(5, 7), 10)}월 ${parseInt(
        date.substring(8, 10),
        10
      )}, ${date.substring(0, 4)}`
    : "미정";

  const overviewRender = () => (
    <p className="text-sm max-h-10 overflow-ellipsis overflow-hidden line-clamp-2">
      {content.overview}
    </p>
  );

  if (!content.poster_path) {
    return <></>;
  }
  return (
    <div className="flex mt-5 border-gray-300 border rounded-md w-6/8 h-48">
      <button className="relative w-32">
        <Link href={pathUrl} passHref>
          <Image
            className="relative h-full w-40 rounded-l-md"
            placeholder="blur"
            blurDataURL={posterUrl}
            layout="fill"
            objectFit="cover"
            src={posterUrl}
            alt={title}
          />
        </Link>
      </button>

      <div className="grid grid-cols-1 gap-4 w-8/12 py-2 px-3">
        <div className="grid grid cols-1">
          <Link href={pathUrl} passHref>
            <p className="align-middle text-base font-bold">{title}</p>
          </Link>
          <p className="text-gray-400 align-middle text-sm">{handlingDate}</p>
        </div>
        {content.overview ? overviewRender() : <></>}
      </div>
    </div>
  );
};

export default SearchContent;
