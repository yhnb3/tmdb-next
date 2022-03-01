import useSWRInfinite from 'swr/infinite';
import axios from 'axios';

interface Props {
  query: string | string[],
  category: string,
}

interface Data {
  page: number,
  total_pages: number,
}

const useInfiniteFetchData = ({ category, query } :Props) => {
  const fetcher = (url : string) => axios.get(url).then((res) => res.data);

  const getKey = (pageIndex:number, previousPageData:Data) => {
    if (
      previousPageData &&
      previousPageData.page === previousPageData.total_pages
    )
      return null;
    return `https://api.themoviedb.org/3/search/${category}?api_key=${
      process.env.NEXT_PUBLIC_API_CODE
    }&language=ko&query=${query}&page=${
      pageIndex + 1
    }&include_adult=false`;
  };

  const {
    data = [],
    error,
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcher);

  const initialLoading = data.length === 0 && !error;
  const loading = initialLoading || (size > 0 && data && typeof data[size -1] === 'undefined')

  return {
    size, setSize, data, error, loading, initialLoading
  }
}

export default useInfiniteFetchData