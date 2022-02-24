import type { ReactElement } from 'react'
import * as React from "react";
import Head from "next/head";

import Layout from '../../components/Layout';

import SectionContents from '../../components/content/SectionContents';

export default function Popular() {
  return <SectionContents section="popular" category="movie" head_line="인기 영화" />
}

Popular.getLayout = function getLayout(page: ReactElement) {
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