import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image'

import getKnownFor from './utills/getKnownFor';

interface Person {
  id: string,
  profile_path: string,
  name: string,
  known_for: Array<{name? : string, title? : string}>,
}

interface Props {
  person: Person
}

export default function Person({ person } : Props) {
  const { id, profile_path, name, known_for } = person;
  const profile = profile_path
    ? `https://image.tmdb.org/t/p/w235_and_h235_face${profile_path}`
    : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';
  return (
    <div className="border border-gray-300 shadow-sm w-person my-5 h-person mobile:w-40 mobile:h-56">
      <Link href={`/person/${id}`}>
        <a>
        <Image placeholder='blur' blurDataURL={profile} objectFit="cover" width="235" height="235" src={profile} alt={name} />
        </a>
      </Link>
      <div className="m-2 mobile:m-1">
        <Link href={`/person/${id}`} passHref>
          <p className="font-bold line-clamp-1">{name}</p>
        </Link>
        <p className="font-extralight line-clamp-1 text-sm text-neutral-600">{getKnownFor(known_for)}</p>
      </div>
    </div>
  );
}
