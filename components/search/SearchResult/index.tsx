import * as React from "react";

import ContentResult from "./ContentResult";
import PersonResult from "./PersonResult";

interface Content {
  title?: string;
  name?: string;
  poster_path: string;
  id: string;
  release_date?: string;
  first_air_date?: string;
  overview: string;
}

interface ContentPage {
  total_pages: number;
  results: Array<Content>;
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

interface Props {
  currentSection: string;
  movieData: Array<ContentPage>;
  tvData: Array<ContentPage>;
  personData: Array<PersonPage>;
  movieCurrentPage: number;
  tvCurrentPage: number;
  personCurrentPage: number;
  movieSetCurrentPage: (page: number) => void;
  tvSetCurrentPage: (page: number) => void;
  personSetCurrentPage: (page: number) => void;
  loading: boolean;
  isMobile: boolean;
}

const SearchResult = (props: Props) => {
  if (props.loading) return <p>로딩중...</p>;
  if (props.currentSection === "person")
    return (
      <PersonResult
        persons={props.personData}
        currentPage={props.personCurrentPage}
        handlePage={props.personSetCurrentPage}
      />
    );
  if (props.currentSection === "movie")
    return (
      <ContentResult
        isMobile={props.isMobile}
        contents={props.movieData}
        currentPage={props.movieCurrentPage}
        handlePage={props.movieSetCurrentPage}
      />
    );
  return (
    <ContentResult
      isMobile={props.isMobile}
      contents={props.tvData}
      currentPage={props.tvCurrentPage}
      handlePage={props.tvSetCurrentPage}
    />
  );
};

export default SearchResult;
