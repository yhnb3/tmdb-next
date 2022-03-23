import * as React from 'react'

interface Data {
  total_results: string,
}

interface Props {
  movieData: Array<Data>,
  tvData: Array<Data>,
  personData: Array<Data>,
  currentSection: string,
  handleCurrentSection: ({section : string}) => void
}

const ResultSummary = ({movieData, tvData, personData, currentSection, handleCurrentSection} : Props) => {
  const [isHover, setIsHover] = React.useState({
    movie: false,
    tv: false,
    person: false,
  });

  const mouseOn = (section : string) => {
    setIsHover({ ...isHover, [section]: true });
  };
  const mouseOut = (section : string) => {
    setIsHover({ ...isHover, [section]: false });
  };

  const results = [
    { section: '영화', name: 'movie', count: movieData[0].total_results },
    { section: 'TV 프로그램', name: 'tv', count: tvData[0].total_results },
    { section: '인물', name: 'person', count: personData[0].total_results },
  ];

  return <>
  {results.map((element) => (
    <div
      key={element.name}
      className={`flex justify-between px-4 py-2 ${
        element.name === currentSection || isHover[element.name]
          ? 'bg-gray-200 mobile:text-blue-400 mobile:bg-transparent'
          : ''
      }`}
      role="button"
      tabIndex={0}
      onMouseOver={() => mouseOn(element.name)}
      onFocus={() => mouseOn(element.name)}
      onMouseOut={() => mouseOut(element.name)}
      onBlur={() => mouseOut(element.name)}
      onClick={() => handleCurrentSection({section : element.name})}
      onKeyDown={() => handleCurrentSection({section : element.name})}
    >
      <span
        className={`p-1 ${
          element.name === currentSection ? 'font-bold' : ''
        }`}
      >
        {element.section}
      </span>
      <span
        className={`text-xs text-center align-middle my-1.5 rounded-md mobile:border text-black ${
          element.name === currentSection || isHover[element.name]
            ? 'bg-white mobile:border-blue-400'
            : 'bg-gray-200 mobile:bg-white'
        } w-6`}
      >
        {element.count}
      </span>
    </div>
  ))}
  </>
};

export default ResultSummary