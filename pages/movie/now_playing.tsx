import type { ReactElement } from 'react'
import { GetServerSideProps } from 'next/types';
import Head from "next/head";

import Layout from '../../components/Layout';

import SectionContents from '../../components/content/SectionContents';
import isMobile from '../../libs/isMobile';

export default function NowPlaying({isMobileDevice}) {
  return <SectionContents section="now_playing" category="movie" head_line="현재 상영 영화" isMobile={isMobileDevice}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isMobileDevice = isMobile(context.req)
  return {
    props: {
      isMobileDevice,
    }
  }
}

NowPlaying.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>현재 상영 영화</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  )
}