import * as React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { BsDot } from '@react-icons/all-files/bs/BsDot';

import Pagination from './Pagination'

interface Props {
  persons: Array<PersonPage>
  currentPage: number
  handlePage: (page: number) => void
}

interface PersonPage {
  results: Array<Person>,
  total_pages: number
}

interface Person {
  id: string,
  profile_path: string,
  name: string,
  known_for_department: string,
  known_for: Array<{
    title? :string,
    name? : string,
    id: string,
  }>
}

export default function PersonResult ({persons, currentPage, handlePage} : Props) {

  if (persons[0].results.length > 0) {
    return (
      <div className="mt-10">
        {persons[currentPage - 1].results.map((element) => (
          <div className="flex flex-row mt-5 h-full" key={element.id}>
            <Link href={`/person/${element.id}`}>
              <a>
                <div className='w-20 h-20 relative'>
                  <Image
                    layout='fill'
                    className=" object-cover object-center rounded-md"
                    src={`https://image.tmdb.org/t/p/w300/${element.profile_path}`}
                    alt={element.name}
                  />
                </div>
              </a>
              
            </Link>

            <div className="flex flex-col justify-center ml-5">
              <p className="text-xl font-bold">{element.name}</p>
              <div className="flex flex-row">
                <p>{element.known_for_department}</p>
                <div className="flex items-center">
                  <BsDot />
                </div>
                {element.known_for.map((content, idx) => {
                  const title = content.title || content.name;
                  return (
                    <div key={title}>
                      <Link
                        href={
                          content.title
                            ? `/movie/${content.id}`
                            : `/tv/${content.id}`
                        }
                      >
                        {idx === element.known_for.length - 1 ? (
                          <p>{title}</p>
                        ) : (
                          <p className="mr-2">
                            {title}
                            {', '}
                          </p>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
        {persons[0].total_pages > 1 ? (
          <Pagination
            page={currentPage}
            totalPage={persons[0].total_pages}
            handlePage={handlePage}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
  return <p>검색결과가 없습니다.</p>;
};