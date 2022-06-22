import type { ReactElement } from "react";
import { GetServerSideProps } from "next/types";
import Head from "next/head";

import { Layout } from "components/shared";
import { SectionContents } from "components/content";
import { isMobile } from "libs";

export default function TopRated({ isMobileDevice }) {
  return (
    <SectionContents
      section="top_rated"
      category="tv"
      head_line="높은 평점의 TV 프로그램"
      isMobile={isMobileDevice}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isMobileDevice = isMobile(context.req);
  return {
    props: {
      isMobileDevice,
    },
  };
};
TopRated.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>높은 평점의 TV 프로그램</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  );
};
