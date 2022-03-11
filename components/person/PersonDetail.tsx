import Image from 'next/image'

import { KnownFor, PersonHistory, PersonInfo } from './components';
import { Person } from './types'

interface Props {
  person: Person
}

export default function PersonDetail({ person } : Props) {
  return (
    <div className="flex flex-row mt-10 mobile:px-0 mobile:w-full w-screen mx-auto">
      <div className="flex flex-col min-w-personImg ">
          <Image
            width={300}
            height={450}
            objectFit='cover'
            className="rounded-md shadow-lg"
            src={`https://image.tmdb.org/t/p/w300/${person.profile_path}`}
            alt={person.name}
          />
        <PersonInfo person={person} />
      </div>
      <div className="flex flex-col pl-10 w-8/12">
        <p className="text-3xl font-bold pb-4">{person.name}</p>
        <div className="py-4">
          <p className="text-2xl font-bold">약력</p>
          <p>
            {person.biography
              ? person.biography
              : `${person.name}의 약력란이 비어있습니다.`}
          </p>
        </div>
        <KnownFor id={person.id} department={person.known_for_department}/>
        <PersonHistory id={person.id} />
      </div>
    </div>
  );
}
