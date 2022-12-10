import { useRef } from "react";

import PersonList from "./PersonList";
import { useInfiniteScroll } from "hooks";
import Loading from "../Loading";

interface Person {
  id: string;
  profile_path: string;
  name: string;
  known_for: Array<{ name?: string; title?: string }>;
}

interface IProps {
  section: string;
  category: string;
  head_line: string;
}

const PersonContents = ({ section, category, head_line }: IProps) => {
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const isMobile = window.innerWidth <= 500;
  const { data } = useInfiniteScroll({
    target: loadingRef,
    section,
    category,
  });

  const isLoadingVisible =
    data.length === 0 || data[0].total_pages !== data.length;

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
        {data.map((element: { page: number; results: Array<Person> }) => (
          <PersonList key={element.page} persons={element.results} />
        ))}
        {isLoadingVisible ? (
          <div ref={loadingRef}>
            <Loading />
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default PersonContents;
