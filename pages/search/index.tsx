import { ReactElement, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Head from "next/head";
import { useRouter } from "next/router";

import { AppState } from "app/store";
import { changeSection } from "app/search/searchSlice";

import { Input, ResultSummary, SearchResult } from "components/search";
import { Layout, Loading } from "components/shared";

import { useSearchFetchData } from "hooks";

export default function Search() {
  const router = useRouter();
  const { query } = router.query;
  const { section } = useSelector((state: AppState) => state.searchSlice);

  const dispatch = useDispatch();

  const setSection = useCallback(
    (section) => {
      dispatch(changeSection({ section }));
    },
    [dispatch]
  );

  const {
    movieData,
    movieSetSize,
    movieSize,
    tvData,
    tvSetSize,
    tvSize,
    personData,
    personSetSize,
    personSize,
    loading,
    initialLoading,
    section: selectedSection,
  } = useSearchFetchData({ query });

  useEffect(() => {
    if (!loading) {
      setSection(selectedSection);
    }
  }, [loading, selectedSection, setSection]);

  return (
    <div className="h-full">
      <Head>
        <title>{query}</title>
        <meta name="description" content="Helmet application" />
      </Head>
      <Input query={query} />
      <div className="flex flex-row w-screen mx-auto mobile:block mobile:w-full mobile:h-full">
        <div className="w-4/12 pt-10 pr-10 mobile:w-full mobile:p-0 mobile:h-1/5">
          <div className="rounded-lg border border-gray-200 mobile:rounded-none">
            <div className="h-16 w-full bg-blue-400 rounded-t-lg flex items-center mobile:rounded-none">
              <div className="ml-4 text-white font-bold">Search Result</div>
            </div>
            <div className="mt-2 my-5 mobile:flex-row mobile:flex mobile:my-0 mobile:whitespace-nowrap mobile:overflow-auto">
              <ResultSummary
                movieData={movieData}
                personData={personData}
                tvData={tvData}
                currentSection={section}
                setSection={setSection}
              />
            </div>
          </div>
        </div>
        <div className="w-8/12 mobile:w-full mobile:px-5 mobile:h-4/5 mobile:overflow-auto mobile:pb-10">
          {initialLoading ? (
            <Loading />
          ) : (
            <SearchResult
              currentSection={section}
              tvData={tvData}
              movieData={movieData}
              personData={personData}
              movieCurrentPage={movieSize}
              movieSetCurrentPage={movieSetSize}
              tvCurrentPage={tvSize}
              tvSetCurrentPage={tvSetSize}
              personCurrentPage={personSize}
              personSetCurrentPage={personSetSize}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
