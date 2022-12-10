import { BsCircle } from "@react-icons/all-files/bs/BsCircle";

import handlingHistory from "../utills/handlingHistory";
import { useFetchData } from "hooks/useFetchData";

interface Props {
  id: string;
}

export default function PersonHistory({ id }: Props) {
  const endPoint = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`;
  const { loading, error, data } = useFetchData({ endPoint });

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러가 발생하였습니다.</p>;

  const newArr = handlingHistory({ credit: data });

  return (
    <div className="flex flex-col">
      {newArr.map((job) => (
        <div className="mt-5" key={job.job}>
          <p className="text-2xl font-bold">{job.job}</p>
          <div className="border mt-5">
            {job.history.map((contents) => (
              <div className="border-b" key={contents.date}>
                {contents.data.map((content) => (
                  <div
                    className="flex flex-row"
                    key={`${job.job}-${content.id}`}
                  >
                    <div className="w-10 text-center p-2 text-sm">
                      {contents.date}
                    </div>
                    {window.innerWidth > 500 ? (
                      <div className="my-auto py-2 px-4">
                        <BsCircle className="w-3 h-3" />
                      </div>
                    ) : (
                      <></>
                    )}

                    <span className="my-2 max-w-full">
                      <strong className="text-center p-2 font-bold">
                        <span>{content.title || content.name}</span>
                      </strong>
                      {content.character ? (
                        <span className="text-sm text-center">
                          {content.character}
                        </span>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
