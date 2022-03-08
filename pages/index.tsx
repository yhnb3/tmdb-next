import type { ReactElement } from 'react'
import Head from "next/head";
import { GetStaticProps } from 'next/types';

import Layout from '../components/Layout';
import SectionList from '../components/home/SectionList'

export default function Home({sectionList}) {
  return (
  <div className="mx-auto w-screen mobile:mx-0 mobile:w-full">
    <div className="flex h-80 w-full bg-blue-200">
      <div className="m-auto w-11/12 h-2/4">
        <div className="flex-wrap mb-10">
          <p className="text-4xl">Welcome.</p>
          <p className="text-2xl">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>
        <div className="relative rounded-full bg-white">
          <form action="/search?" className="h-12 w-full">
            <input
              className="px-5 py-3 outline-none rounded-full w-10/12"
              type="text"
              dir="auto"
              name="query"
              placeholder="영화, tv 프로그램 검색..."
            />
            <input
              type="submit"
              value="Search"
              className="absolute h-full rounded-full w-20 right-0 z-10 cursor-pointer bg-cyan-500"
            />
          </form>
        </div>
      </div>
    </div>
    <SectionList  sectionList={sectionList} />
  </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const urls = [
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko&page=1`,
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko&page=1`,
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`,
    `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`,
  ]
  const promises = await urls.map( async (url) => {
    const res = await fetch(url)
    return await res.json()
  })

  const datas = await Promise.all(promises)

  const sectionList = [
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
      sectionList,
    },
    revalidate: 60 * 60 * 24,
  }
}



Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>TMDB BY KANGWOO</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  )
}