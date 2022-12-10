import type { ReactElement } from "react";
import Head from "next/head";

import { Layout } from "components/shared";
import { SectionContents } from "components/content";

export default function TopRated() {
  const isMobileDevice = window ? window.innerWidth <= 500 : false;
  return (
    <SectionContents
      section="top_rated"
      category="tv"
      head_line="높은 평점의 TV 프로그램"
      isMobile={isMobileDevice}
    />
  );
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
  );
};
