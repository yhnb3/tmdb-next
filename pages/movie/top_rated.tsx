import type { ReactElement } from 'react'
import * as React from "react";
import Head from "next/head";

import Layout from '../../components/Layout';

import SectionContents from '../../components/content/SectionContents';

export default function TopRated() {
  return <SectionContents section="top_rated" category="movie" head_line="높은 평점의 인기 영화" />
}
TopRated.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>높은 평점의 인기 영화</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  )
}