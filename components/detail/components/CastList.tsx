import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useFetchData from '../../../hooks/useFetchData'

interface Props {
  id: string,
  section: string,
}

const CastList : React.FC<Props> = ({id, section} : Props) => {
  const endPoint = `https://api.themoviedb.org/3/${section}/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`
  const { loading, error, data } = useFetchData({endPoint})
  
  if (loading) return <p>로딩중...</p>
  if (error) return <p>에러가 발생하였습니다.</p>

  return (
  <div className="my-5">
    <p className="font-bold text-xl m-2">주요 출연진</p>
    <div className="flex flex-row">
      {data.cast.map((element: { name: string, character: string, id: string, order: number, profile_path: string}) => {
        if (element.order < 7) {
          return (
            <div
              className="relative border border-gray-200 rounded-lg w-36 mx-2 shadow-md"
              key={element.id}
            >
              <Link href={`/person/${element.id}`} passHref>
                <a>
                <Image
                  placeholder='blur'
                  blurDataURL={element.profile_path ? `https://image.tmdb.org/t/p/original/${element.profile_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'}
                  className="object-cover object-top rounded-lg"
                  width={142}
                  height={175}
                  src={element.profile_path ? `https://image.tmdb.org/t/p/original/${element.profile_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'}
                  alt={element.name}
                />
                </a>
              </Link>
              <div className="p-1">
                <p className="font-bold">{element.name}</p>
                <p className="text-sm text-gray-400 whitespace-normal">
                  {element.character}
                </p>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  </div>
)}
export default CastList