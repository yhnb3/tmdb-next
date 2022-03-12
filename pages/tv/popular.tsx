import type { ReactElement } from 'react'
import { GetServerSideProps } from 'next/types';
import Head from "next/head";

import Layout from '../../components/Layout';

import SectionContents from '../../components/content/SectionContents';
import isMobile from '../../libs/isMobile';

export default function Popular({isMobileDevice}) {
  return <SectionContents section="popular" category="tv" head_line="인기 TV 프로그램" isMobile={isMobileDevice}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isMobileDevice = isMobile(context.req)
  return {
    props: {
      isMobileDevice,
    }
  }
}

Popular.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>인기 TV 프로그램</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  )
}