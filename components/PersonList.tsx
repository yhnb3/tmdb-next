import * as React from 'react';
import PersonLoading from './PersonLoading';

import Person from './Person';

interface Person {
  id: string,
  profile_path: string,
  name: string,
  known_for: Array<{name? : string, title? : string}>,
}

interface Props {
  persons: Array<Person>,
}

export default function personList({ persons } : Props) {
  return (
    <div className="grid grid-cols-5 place-items-center mobile:grid-cols-2">
      {persons.map((element) => (
        <Person person={element} key={element.name} />
      ))}
    </div>
  );
}