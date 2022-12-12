import Link from "next/link";
import Image from "next/image";

interface Content {
  title?: string;
  name?: string;
  poster_path: string;
  id: string;
  release_date?: string;
  first_air_date?: string;
  overview: string;
}

interface Props {
  content: Content;
}

export default function searchContent({ content }: Props) {
  const title = content.title || content.name;
  const posterUrl = content.poster_path
    ? `https://image.tmdb.org/t/p/w300/${content.poster_path}`
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
    <p className="max-h-12 overflow-ellipsis overflow-hidden line-clamp-2 mobile:text-sm mobile:max-h-10">
      {content.overview}
    </p>
  );

  return (
    <div className="flex mt-10 mb-10 border-gray-300 border rounded-md w-6/8 mobile:mt-5 mobile:mb-0">
      <Link href={pathUrl} passHref>
        <button>
          <div className="relative w-img h-img">
            <Image
              placeholder="blur"
              blurDataURL={posterUrl}
              layout="fill"
              className="rounded-l-md object-cover mobile:w-auto mobile:h-36"
              src={posterUrl}
              alt=""
            />
          </div>
        </button>
      </Link>
      <div className="grid grid-cols-1 p-5 gap-4 w-11/12 mobile:w-8/12 mobile:py-5 mobile:px-3">
        <div className="grid grid cols-1">
          <Link href={pathUrl} passHref>
            <a>
              <p className="text-2xl align-middle mobile:text-base mobile:font-bold">
                {title}
              </p>
            </a>
          </Link>
          <p className="text-xl text-gray-400 align-middle mobile:text-sm">
            {handlingDate}
          </p>
        </div>
        {content.overview ? overviewRender() : <></>}
      </div>
    </div>
  );
}
