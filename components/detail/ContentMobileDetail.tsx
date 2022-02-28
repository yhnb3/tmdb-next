import * as React from "react";

import Rate from "../Rate";
import { ImportantCrew, RecommendationSection } from "./section";
import MobileCastList from "./section/MobileCastList.tsx";

export default function mobileDetail({ content }) {
  console.log(content);
  const section = content.title ? "movie" : "tv";
  const backDropUrl = `https://image.tmdb.org/t/p/original/${content.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w300/${content.poster_path}`;
  const date = content.title ? content.release_date : content.first_air_date;
  const runtime = {
    hour: parseInt(content.runtime / 60, 10),
    minute: content.runtime % 60,
  };

  const renderGenre = () => {
    const { genres } = content || [];
    const genreString = genres.map((genre) => genre.name).join(", ");
    return <span className="mx-1">{genreString}</span>;
  };

  const renderDate = () => (
    <div>
      <span>
        {date.substring(0, 4)}/{date.substring(5, 7)}/{date.substring(8, 10)}
        (KR)
      </span>
      {content.title ? (
        <span className="px-2">
          {runtime.hour}h {runtime.minute}m
        </span>
      ) : (
        <span className="px-2">{content.episode_run_time[0]}m</span>
      )}
    </div>
  );

  return (
    <div>
      <div className="h-40 relative">
        <img
          className="h-40 w-full object-cover object-top"
          src={backDropUrl}
          alt={content.title || content.name}
        />
        <div className="absolute h-40 inset-y-0 left-0 px-4 py-4 bg-gradient-to-r from-blackOp100 via-blackOp100 to-blackOp0">
          <img
            className="h-32 object-cover rounded-md"
            src={posterUrl}
            alt={content.title || content.name}
          />
        </div>
      </div>
      <div>
        <div className="bg-gray-900 text-white">
          <div className="text-center font-bold text-xl p-2">
            <span>{content.name || content.title}</span>
            <span className="text-base text-gray-500 font-normal px-1">
              ({date.substring(0, 4)})
            </span>
          </div>
          <div className="flex flex-row p-4">
            <Rate score={content.vote_average} times="1" />
            <span className="text-white text-sm font-bold align-middle p-2">
              회원점수
            </span>
          </div>
          <div className="border-t border-b border-black px-auto text-center text-sm p-2">
            {renderDate()}
            <div>{renderGenre()}</div>
          </div>
          <div className="p-2">
            <div className="italic text-gray-500 text-sm my-1">
              {content.tagline}
            </div>
            <div className="my-1">
              <p className="font-bold my-1">개요</p>
              <p className="text-sm">
                {content.overview || "해당 언어의 개요가 존재하지 않습니다."}
              </p>
            </div>
          </div>
          <ImportantCrew id={content.id} section={section} />
        </div>
        <MobileCastList id={content.id} section={section} />
        <RecommendationSection id={content.id} section={section} />
      </div>
    </div>
  );
}
