import { useState, MouseEvent } from "react";
import SideBtn from "../../SideBtn";

interface Props {
  sideVisible: boolean;
  handleSide: () => void;
  count: number;
}

const MOVIE = [
  { href: "/movie/popular", name: "인기" },
  { href: "/movie/top_rated", name: "평점 높은" },
  { href: "/movie/now_playing", name: "현재 상영중" },
];

const TV = [
  { href: "/tv/popular", name: "인기" },
  { href: "/tv/top_rated", name: "평점 높은" },
];

export default function MobileSide({ sideVisible, handleSide, count }: Props) {
  const [subMenuVisible, setSubMenuVisible] = useState({
    movie: false,
    tv: false,
    person: false,
  });

  const handleSubMenu = (event: MouseEvent<HTMLButtonElement>) => {
    const { category } = event.currentTarget.dataset;
    setSubMenuVisible({
      ...subMenuVisible,
      [category]: !subMenuVisible[category],
    });
  };

  return (
    <div
      className={`fixed visible top-20 w-80 min-h-screen z-50 bg-blue-800 opacity-95 ${
        count === 0
          ? "-left-80"
          : sideVisible
          ? "animate-show-side left-0"
          : "animate-hide-side -left-80"
      }`}
    >
      <div className="flex flex-col text-white text-2xl  p-5 ">
        <button
          className="text-left font-bold"
          type="button"
          data-category="movie"
          onClick={handleSubMenu}
        >
          영화
        </button>
        <ul
          className={`text-xl p-1 mb-5 ${
            subMenuVisible.movie ? "block" : "hidden"
          }`}
        >
          {MOVIE.map((item) => {
            const key = `menu-movie-${item.name}`;
            return (
              <SideBtn
                key={key}
                href={item.href}
                name={item.name}
                handleSide={handleSide}
              />
            );
          })}
        </ul>
        <button
          className="text-left font-bold"
          type="button"
          data-category="tv"
          onClick={handleSubMenu}
        >
          TV 프로그램
        </button>
        <ul
          className={`text-xl p-1 mb-5 ${
            subMenuVisible.tv ? "block" : "hidden"
          }`}
        >
          {TV.map((item) => {
            const key = `menu-tv-${item.name}`;
            return (
              <SideBtn
                key={key}
                href={item.href}
                name={item.name}
                handleSide={handleSide}
              />
            );
          })}
        </ul>
        <button
          className="text-left font-bold"
          type="button"
          data-category="person"
          onClick={handleSubMenu}
        >
          인물
        </button>
        <ul
          className={`text-xl p-1 mb-5 ${
            subMenuVisible.person ? "block" : "hidden"
          }`}
        >
          <SideBtn
            href="/person/popular"
            name="인기 인물"
            handleSide={handleSide}
          />
        </ul>
      </div>
    </div>
  );
}
