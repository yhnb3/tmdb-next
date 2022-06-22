import type { ReactElement } from "react";
import { GetServerSideProps } from "next/types";
import Head from "next/head";

import { Layout } from "components/shared";
import { SectionContents } from "components/content";
import { isMobile } from "libs";

export default function Popular({ isMobileDevice }) {
  return (
    <SectionContents
      section="popular"
      category="movie"
      head_line="인기 영화"
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

Popular.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>인기 영화</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  );
};
