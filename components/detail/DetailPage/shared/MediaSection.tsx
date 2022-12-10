import { useFetchData } from "hooks/useFetchData";

interface Props {
  id: string;
}
const MediaSection: React.FC<Props> = ({ id }: Props) => {
  const endPoint = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`;
  const { loading, error, data } = useFetchData({ endPoint });
  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러가 발생하였습니다.</p>;
  return (
    <div>
      <p className="font-bold text-xl m-2">미디어</p>
      {data.results.length > 0 ? (
        <div className="flex flex-row m-2">
          {data.results[0] ? (
            <iframe
              id="ytplayer"
              width="448"
              height="273"
              src={`https://www.youtube.com/embed/${data.results[0].key}?autoplay=0`}
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>
          ) : null}
          {data.results[1] ? (
            <iframe
              id="ytplayer"
              width="448"
              height="273"
              src={`https://www.youtube.com/embed/${data.results[1].key}?autoplay=0`}
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>
          ) : null}
        </div>
      ) : (
        <div>
          <p>관련 동영상이 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MediaSection;
