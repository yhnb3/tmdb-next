import { Poster, SearchContent } from "components/shared";

import { useInfiniteScroll, useIsMobile } from "hooks";
import { useMemo, useRef } from "react";
import Loading from "../Loading";
import MobileContentLoading from "../Loading/MobileContentLoading";

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

interface IProps {
  section: string;
  category: string;
  head_line: string;
}

const SectionContents = ({ section, category, head_line }: IProps) => {
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  const { data, loading } = useInfiniteScroll({
    target: loadingRef,
    section,
    category,
  });

  const mobileContents = useMemo(() => {
    return data.map((contents: { results: Array<Content> }) =>
      contents.results.map((element) => (
        <SearchContent key={element.id} content={element} />
      ))
    );
  }, [data]);

  const webContents = useMemo(() => {
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
  }, [data]);

  if (loading)
    return (
      <div
        className={`mx-auto max-w-screeen ${
          isMobile ? "px-5 w-full mt-10" : "w-screen pt-10"
        }`}
      >
        <h1 className={`${isMobile ? "text-xl" : "text-4xl"} font-bold`}>
          {head_line}
        </h1>
        <section>{isMobile ? <MobileContentLoading /> : <Loading />}</section>
      </div>
    );
  const isLoadingVisible = data[0].total_pages !== data.length;
  return (
    <div
      className={`mx-auto max-w-screeen ${
        isMobile ? "px-5 w-full mt-10" : "w-screen pt-10"
      }`}
    >
      <h1 className={`${isMobile ? "text-xl" : "text-4xl"} font-bold`}>
        {head_line}
      </h1>
      <section>
        {isMobile ? mobileContents : webContents}
        {isLoadingVisible ? (
          <div ref={loadingRef}>
            <Loading />
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default SectionContents;
