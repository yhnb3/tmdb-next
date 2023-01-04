import { useMemo } from "react";
import { useSearchInfiniteFetchData } from "./useSearchInfiniteFetchData";

interface Props {
  query: string | string[];
}

export const useSearchFetchData = ({ query }: Props) => {
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

  const section = useMemo(() => {
    if (initialLoading) return "movie";
    if (movieData[0].length > 0) return "movie";
    if (tvData[0].length > 0) return "tv";
    if (personData[0].length > 0) return "person";
    return "movie";
  }, [initialLoading, movieData, personData, tvData]);

  return {
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
    section,
  };
};
