import Link from 'next/link'
import Image from 'next/image'

interface Props {
  credit: Credit,
  loading: boolean,
}

interface Credit {
  crew: Array<Crew>
  cast: Array<Cast>
}

interface Crew {
  department: string,
  name: string,
  job: string,
}

interface Cast {
  order: number, 
  id: string, 
  profile_path: string, 
  name: string, 
  character: string
}

const MobileCastList : React.FC<Props> = ({credit, loading}: Props) => {
  if(loading) return <p>로딩중</p>
  return (
    <div className="my-5">
      <p className="font-bold text-xl m-2">주요 출연진</p>
      <div className=" scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-gray-300 whitespace-nowrap overflow-x-auto">
        {credit.cast.map((element:Cast) => {
          if (element.order < 7) {
            return (
              <div
                className="inline-flex flex-col w-32 border border-gray-200 rounded-lg m-4 shadow-md h-56"
                key={element.id}
              >
                <Link href={`/person/${element.id}`} passHref>
                  <a>
                  <Image
                    placeholder='blur'
                    blurDataURL={`https://image.tmdb.org/t/p/original/${element.profile_path}`}
                    width={126}
                    height={144}
                    objectFit='cover'
                    className="object-top rounded-lg"
                    src={`https://image.tmdb.org/t/p/original/${element.profile_path}`}
                    alt={element.name}
                  />
                  </a>
                  
                </Link>
                <div className="p-1">
                  <p className="text-sm font-bold whitespace-normal">
                    {element.name}
                  </p>
                  <p className="text-xs text-gray-400 whitespace-normal">
                    {element.character}
                  </p>
                </div>
              </div>
            );
          }
          return <></>;
        })}
      </div>
    </div>
  )
}

export default MobileCastList