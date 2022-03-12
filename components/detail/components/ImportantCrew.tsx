interface Props {
  credit: Credit,
  loading: boolean,
}

interface Credit {
  crew: Array<Crew>
}

interface Crew {
  department: string,
  name: string,
  job: string,
}

export default function ImportantCrew({ credit, loading }: Props) {
  if (loading) return <p>로딩중</p>
  const canBe = credit.crew.filter(
    (person : Crew) =>
      person.department === 'Writing' || person.department === 'Production',
  );

  const personMap = new Map();

  canBe.forEach((person) => {
    if (!personMap.has(person.name)) {
      personMap.set(person.name, person.job);
    }
  });
  const persons = Array.from(personMap).slice(0, 6);
  return (
    <div className="grid grid-cols-2 my-2 p-2">
      {persons.map(([name, job], idx) => (
        <div className="py-1" key={idx}>
          <p className="text-sm font-bold">{name}</p>
          <p className="text-xs">{job}</p>
        </div>
      ))}
    </div>
  );
}
