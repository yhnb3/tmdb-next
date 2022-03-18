import Image from 'next/image'

import { KnownFor, PersonHistory, PersonInfo } from './components';
import { Person } from './types'

interface Props {
  person: Person
}

export default function PersonMobileDetail({ person } : Props) {
  return (
    <div className="flex flex-col pt-20 px-4 pb-24">
      <div className="mx-auto">
        <Image
          placeholder='blur'
          blurDataURL={`https://image.tmdb.org/t/p/w235_and_h235_face/${person.profile_path}`}
          width={200}
          height={200}
          objectFit='cover'
          className="rounded-md mx-auto"
          src={`https://image.tmdb.org/t/p/w235_and_h235_face/${person.profile_path}`}
          alt={person.name}
        />
        
      </div>
      <div className="text-center mt-4 text-3xl font-bold">{person.name}</div>
      <PersonInfo person={person} />
      <div className="mb-4">
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
  );
}