import type { ReactElement } from 'react'
import * as React from "react";
import Head from "next/head";

import Layout from '../../components/Layout';
import InfiniteScroll from '../../components/InfinityScroll'
import SectionContents from '../../components/content/SectionContents';
import useInfiniteFetchData from '../../hooks/useInfiniteFetchData';

export default function Populars() {
  const { data, error, isLoading, size, setSize} = useInfiniteFetchData({section: 'popular', category: 'movie'})

  return (
  <div className="mx-auto w-screen pt-10 mobile:px-5 mobile:w-full">
    <div className="text-3xl font-bold none mobile:block mobile:text-xl">
      인기 영화
    </div>
    <InfiniteScroll
      isLoading={isLoading}
      error={error}
      size={size}
      dataLen={data.length}
      setSize={setSize}
    >
      <SectionContents data={data}/>
    </InfiniteScroll>
  </div>
  );
}

Populars.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>인기 영화</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  )
}