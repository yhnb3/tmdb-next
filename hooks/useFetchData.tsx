import axios from 'axios'
import useSWR from 'swr'


interface Props {
  endPoint: string,
}


const useFetchData: any = ({endPoint} : Props) => {
  const fetcher = (url : string) => axios.get(url).then((res) => res.data)
  const { data, error } = useSWR(
    endPoint,
    fetcher,
  );

  if (!error && !data) return {loading: true}
  if (error) return {error: true}
  return {data}
}

export default useFetchData