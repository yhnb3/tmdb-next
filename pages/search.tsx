import { ReactElement, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GetServerSideProps } from "next/types";
import Head from "next/head";
import { useRouter } from "next/router";

import { Layout } from "components/shared";
import { isMobile } from "libs";

import { useSearchInfiniteFetchData } from "hooks";

import { AppState } from "app/store";
import { changeSection } from "app/search/searchSlice";
import { Input, ResultSummary, SearchResult } from "components/search";
import { Loading } from "components/shared";

export default function Search({ isMobileDevice }) {
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
    data: movieData,
    loading: movieLoading,
    setSize: movieSetSize,
    size: movieSize,
    initialLoading: movieInitialLoading,
  } = useSearchInfiniteFetchData({ category: "movie", query: query });
  const {
    data: tvData,
    loading: tvLoading,
    setSize: tvSetSize,
    size: tvSize,
    initialLoading: tvInitialLoading,
  } = useSearchInfiniteFetchData({ category: "tv", query: query });
  const {
    data: personData,
    loading: personLoading,
    setSize: personSetSize,
    size: personSize,
    initialLoading: personInitialLoading,
  } = useSearchInfiniteFetchData({ category: "person", query: query });

  const initialLoading =
    movieInitialLoading || tvInitialLoading || personInitialLoading;

  const loading = movieLoading || tvLoading || personLoading;

  useEffect(() => {
    if (!loading) {
      if (movieData[0].results.length > 0) return;
      if (tvData[0].results.length > 0) {
        setSection("tv");
        return;
      }
      if (personData[0].results.length > 0) {
        setSection("person");
        return;
      }
    }
  }, [loading, movieData, personData, setSection, tvData]);

  return (
    <div>
      <Head>
        <title>{query}</title>
        <meta name="description" content="Helmet application" />
      </Head>
      <Input query={query} />
      {initialLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-row w-screen mx-auto mobile:flex-col mobile:w-full">
          <div className="w-4/12 pt-10 pr-10 mobile:w-full mobile:p-0">
            <div className="rounded-lg border border-gray-200 mobile:rounded-none">
              <div className="h-16 w-full bg-blue-400 rounded-t-lg flex items-center mobile:rounded-none">
                <div className="ml-4 text-white font-bold">Search Result</div>
              </div>
              <div className="mt-2 my-5 mobile:flex-row mobile:flex mobile:my-0 mobile:whitespace-nowrap mobile:overflow-auto">
                {initialLoading ? null : (
                  <ResultSummary
                    movieData={movieData}
                    personData={personData}
                    tvData={tvData}
                    currentSection={section}
                    setSection={setSection}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-8/12 mobile:w-full mobile:px-5">
            <SearchResult
              isMobile={isMobileDevice}
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
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isMobileDevice = isMobile(context.req);
  return {
    props: {
      isMobileDevice,
    },
  };
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
