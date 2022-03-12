import type { ReactElement } from 'react'
import { GetServerSideProps } from 'next/types';
import Head from "next/head";

import Layout from '../../components/Layout';

import SectionContents from '../../components/content/SectionContents';
import isMobile from '../../libs/isMobile';


export default function TopRated({isMobileDevice}) {
  return <SectionContents section="top_rated" category="movie" head_line="높은 평점의 인기 영화" isMobile={isMobileDevice}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isMobileDevice = isMobile(context.req)
  return {
    props: {
      isMobileDevice,
    }
  }
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