import { Poster, SearchContent } from "components/shared";

import withContentsPage from "HOC/withContentsPage";

interface Content {
  title?: string;
  name?: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  id: string;
  overview: string;
}

const SectionContents = ({ data, isMobile }) => {
  if (isMobile) {
    return data.map((contents: { results: Array<Content> }) =>
      contents.results.map((element) => (
        <SearchContent key={element.id} content={element} />
      ))
    );
  }
  return (
    <div className="grid grid-cols-5 pt-10">
      {data.map((contents: { results: Array<Content> }) =>
        contents.results.map((element: Content) => (
          <div key={element.id}>
            <div className="h-list w-img mx-auto">
              <Poster content={element} key={element.id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default withContentsPage(SectionContents);
