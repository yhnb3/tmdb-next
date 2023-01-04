import { useState, MouseEvent, FocusEvent, KeyboardEvent } from "react";

interface Data {
  total_results: string;
}

interface Props {
  movieData: Array<Data>;
  tvData: Array<Data>;
  personData: Array<Data>;
  currentSection: string;
  setSection: React.Dispatch<React.SetStateAction<string>>;
}

const ResultSummary = ({
  movieData,
  tvData,
  personData,
  currentSection,
  setSection,
}: Props) => {
  const [isHover, setIsHover] = useState({
    movie: false,
    tv: false,
    person: false,
  });

  const mouseOn = (
    event: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>
  ) => {
    const { name } = event.currentTarget.dataset;
    setIsHover({ ...isHover, [name]: true });
  };
  const mouseOut = (
    event: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>
  ) => {
    const { name } = event.currentTarget.dataset;
    setIsHover({ ...isHover, [name]: false });
  };

  const handleChange = (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => {
    const { name } = event.currentTarget.dataset;
    setSection(name);
  };

  const results = [
    {
      section: "영화",
      name: "movie",
      count: movieData[0] ? movieData[0].total_results : 0,
    },
    {
      section: "TV 프로그램",
      name: "tv",
      count: tvData[0] ? tvData[0].total_results : 0,
    },
    {
      section: "인물",
      name: "person",
      count: personData[0] ? personData[0].total_results : 0,
    },
  ];

  return (
    <>
      {results.map((element) => (
        <button
          type="button"
          key={element.name}
          className={`flex w-full justify-between px-4 py-2 ${
            element.name === currentSection || isHover[element.name]
              ? "bg-gray-200 mobile:text-blue-400 mobile:bg-transparent"
              : ""
          }`}
          role="button"
          tabIndex={0}
          data-name={element.name}
          onMouseOver={mouseOn}
          onFocus={mouseOn}
          onMouseOut={mouseOut}
          onBlur={mouseOut}
          onClick={handleChange}
          onKeyDown={handleChange}
        >
          <span
            className={`p-1 ${
              element.name === currentSection ? "font-bold" : ""
            }`}
          >
            {element.section}
          </span>
          <span
            className={`text-xs text-center align-middle my-1.5 rounded-md mobile:border text-black ${
              element.name === currentSection || isHover[element.name]
                ? "bg-white mobile:border-blue-400"
                : "bg-gray-200 mobile:bg-white"
            } w-6`}
          >
            {element.count}
          </span>
        </button>
      ))}
    </>
  );
};

export default ResultSummary;
