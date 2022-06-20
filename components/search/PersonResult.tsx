import * as React from "react";

import Link from "next/link";
import Image from "next/image";

import Pagination from "./Pagination";

interface Props {
  persons: Array<PersonPage>;
  currentPage: number;
  handlePage: (page: number) => void;
}

interface PersonPage {
  results: Array<Person>;
  total_pages: number;
}

interface Person {
  id: string;
  profile_path: string;
  name: string;
  known_for_department: string;
  known_for: Array<{
    title?: string;
    name?: string;
    id: string;
  }>;
}

export default function PersonResult({
  persons,
  currentPage,
  handlePage,
}: Props) {
  if (persons[0].results.length > 0) {
    return (
      <div className="mt-10">
        {persons[currentPage - 1].results.map((element) => (
          <div className="flex flex-row mt-5 h-full" key={element.id}>
            <Link href={`/person/${element.id}`} passHref>
              <button>
                <div className="w-20 h-20 relative">
                  <Image
                    placeholder="blur"
                    blurDataURL={`https://image.tmdb.org/t/p/w300/${element.profile_path}`}
                    layout="fill"
                    className=" object-cover object-center rounded-md"
                    src={`https://image.tmdb.org/t/p/w300/${element.profile_path}`}
                    alt={element.name}
                  />
                </div>
              </button>
            </Link>

            <div className="flex flex-col justify-center ml-5">
              <p className="text-xl font-bold">{element.name}</p>
              <span>
                <span>{element.known_for_department}</span>
                <p className="line-clamp-1">
                  {element.known_for.map((content, idx) => {
                    const title = content.title || content.name;
                    return (
                      <Link
                        key={title}
                        href={
                          content.title
                            ? `/movie/${content.id}`
                            : `/tv/${content.id}`
                        }
                      >
                        {idx === element.known_for.length - 1 ? (
                          <span>{title}</span>
                        ) : (
                          <span className="mr-2">
                            {title}
                            {", "}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </p>
              </span>
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
}
