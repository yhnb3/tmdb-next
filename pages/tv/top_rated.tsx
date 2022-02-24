import type { ReactElement } from 'react'
import * as React from "react";
import Head from "next/head";

import Layout from '../../components/Layout';

import SectionContents from '../../components/content/SectionContents';

export default function TopRated() {
  return <SectionContents section="top_rated" category="tv" head_line="높은 평점의 TV 프로그램" />
}
TopRated.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>높은 평점의 TV 프로그램</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  )
}