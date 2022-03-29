import useSWRInfinite from 'swr/infinite';
import axios from 'axios';

interface Props {
  section: string,
  category: string,
}

interface Data {
  page: number,
  total_pages: number,
}

const useInfiniteFetchData = ({ section, category } :Props) => {
  const fetcher = (url : string) => axios.get(url).then((res) => res.data);

  const getKey = (pageIndex:number, previousPageData:Data) => {
    if (
      previousPageData &&
      previousPageData.page === previousPageData.total_pages
    )
      return null;
    return `https://api.themoviedb.org/3/${category}/${section}?api_key=${
      process.env.NEXT_PUBLIC_API_CODE
    }&language=ko&page=${pageIndex + 1}&region=KR`;
  };

  const {
    data = [],
    error,
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcher);

  const initialLoading = !data && !error;
  const loading = initialLoading || (size > 0 && data && typeof data[size -1] === 'undefined')

  return {
    size, setSize, data, error, loading
  }
}

export default useInfiniteFetchData