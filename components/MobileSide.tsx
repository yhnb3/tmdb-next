import { useState, useRef } from 'react';
import Link from 'next/link';

interface Props {
  sideVisible: boolean,
  handleSide: () => void,
  count: number
}

export default function MobileSide({ sideVisible, handleSide, count } : Props) {
  const [subMenuVisible, setSubMenuVisible] = useState({
    movie: false,
    tv: false,
    person: false,
  }); 
  const handleSubMenu = (category : string) => {
    
    setSubMenuVisible({
      ...subMenuVisible,
      [category]: !subMenuVisible[category],
    });
  };
  return (
    <div
      className={`fixed visible top-20 w-80 min-h-screen z-50 bg-blue-800 opacity-95 ${count === 0 ? "-left-80" : sideVisible ? 'animate-show-side left-0' : 'animate-hide-side -left-80'}`}
    >
      <div className="flex flex-col text-white text-2xl  p-5 ">
        <button
          className="text-left font-bold"
          type="button"
          onClick={() => handleSubMenu('movie')}
        >
          영화
        </button>
        <ul
          className={`text-xl p-1 mb-5 ${
            subMenuVisible.movie ? 'block' : 'hidden'
          }`}
        >
          <Link href="/movie/popular" passHref>
            <a>
            <li className="my-1" onClick={() => handleSide()}>
              인기
            </li>
            </a>
            
          </Link>
          <Link href="/movie/top_rated" passHref>
            <a>
              <li className="my-1" onClick={() => handleSide()}>
              평점 높은
            </li>
            </a>
            
          </Link>
          <Link href="/movie/now_playing" passHref>
            <a>
              <li className="my-1" onClick={() => handleSide()}>
              현재 상영중
            </li>
            </a>
            
          </Link>
        </ul>
        <button
          className="text-left font-bold"
          type="button"
          onClick={() => handleSubMenu('tv')}
        >
          TV 프로그램
        </button>
        <ul
          className={`text-xl p-1 mb-5 ${
            subMenuVisible.tv ? 'block' : 'hidden'
          }`}
        >
          <Link href="/tv/popular" passHref>
            <a>
              <li className="my-1" onClick={() => handleSide()}>
              인기
            </li>
            </a>
            
          </Link>
          <Link href="/tv/top_rated" passHref>
            <a>
              <li className="my-1" onClick={() => handleSide()}>
              평점 높은
            </li>
            </a>
            
          </Link>
        </ul>
        <button
          className="text-left font-bold"
          type="button"
          onClick={() => handleSubMenu('person')}
        >
          인물
        </button>
        <ul
          className={`text-xl p-1 mb-5 ${
            subMenuVisible.person ? 'block' : 'hidden'
          }`}
        >
          <Link href="/person/popular" passHref>
            <a>
              <li className="my-1" onClick={() => handleSide()}>
              인기 인물
            </li>
            </a>     
          </Link>
        </ul>
      </div>
    </div>
  );
}
