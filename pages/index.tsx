import { FormEventHandler, ReactElement, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next/types";

import { Layout } from "components/shared";
import { SectionList } from "components/homepage";
import { useRouter } from "next/router";

export default function Home({ data }) {
  const mainImageSrc = `https://image.tmdb.org/t/p/original${data[2].datas["이번주"].results[0].backdrop_path}`;
  const inputRef = useRef(null);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) return;
    inputRef.current &&
      router.push({
        pathname: "/search",
        query: { query: inputRef.current.value },
      });
  };

  return (
    <div className="relative mx-auto w-screen mobile:mx-0 mobile:w-full">
      <div className="absolute top-0 left-0 w-full h-80 -z-10 mobile:h-60">
        <div className="relative w-full h-80 mobile:h-60">
          <Image
            priority={true}
            layout="fill"
            src={mainImageSrc}
            alt="main image"
            objectFit="cover"
            objectPosition={"0 50%"}
          />
        </div>
      </div>
      <div className="h-80 w-full mobile:h-60 bg-black bg-opacity-60">
        <div className="py-20 mx-auto w-11/12 h-2/4 mobile:py-5">
          <hgroup className="flex-wrap text-white mobile:mb-8 mobile:mt-4">
            <h1 className="text-4xl mobile:text-2xl font-bold">Welcome.</h1>
            <h2 className="text-2xl mobile:text-base">
              Millions of movies, TV shows and people to discover. Explore now.
            </h2>
          </hgroup>
          <div className="relative rounded-full bg-white mt-10">
            <form onSubmit={handleSubmit} className="h-10 w-full">
              <input
                ref={inputRef}
                className="px-5 py-3 h-10 outline-none rounded-full w-10/12"
                autoComplete="off"
                type="text"
                dir="auto"
                name="query"
                placeholder="영화, tv 프로그램 검색..."
              />
              <button
                type="submit"
                className="absolute h-10 rounded-full w-20 right-0 z-10 cursor-pointer bg-gradient-to-r from-blue-400 to-blue-800 text-white text-sm font-bold"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <SectionList sectionList={data} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const urls = [
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko&page=1&region=KR`,
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko&page=1&region=KR`,
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko&region=KR`,
    `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko&region=KR`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko&region=KR`,
  ];
  const promises = urls.map(async (url) => {
    const res = await fetch(url);
    return await res.json();
  });

  const datas = await Promise.all(promises);

  const data = [
    {
      name: "populars",
      title: "What's popular?",
      target: "상영중",
      datas: {
        상영중: datas[0],
        TV: datas[1],
      },
    },
    {
      name: "upcoming",
      title: "개봉 예정 영화",
      target: "",
      datas: datas[4],
    },
    {
      name: "trending",
      title: "트렌딩",
      target: "오늘",
      datas: {
        오늘: datas[2],
        이번주: datas[3],
      },
    },
  ];

  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 24,
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>TMDB BY KANGWOO</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  );
};
