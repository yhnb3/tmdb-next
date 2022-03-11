import Link from 'next/link'
import Image from 'next/image'

import useFetchData from '../../../hooks/useFetchData'

interface Props {
  credit: Credit
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

const MobileCastList : React.FC<Props> = ({credit}: Props) => {
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
                    width={40}
                    height={40}
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