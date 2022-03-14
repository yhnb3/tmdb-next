import Person from './Person';

interface Person {
  id: string,
  profile_path: string,
  name: string,
  known_for: Array<{name? : string, title? : string}>,
}

interface Props {
  persons: Array<Person>,
  isMobile: boolean,
}

export default function personList({ persons, isMobile } : Props) {
  return (
    <div className="flex justify-between flex-wrap">
      {persons.map((element) => (
        <Person person={element} key={element.name} />
      ))}
    </div>
  );
}