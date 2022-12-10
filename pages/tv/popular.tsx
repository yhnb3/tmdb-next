import type { ReactElement } from "react";
import Head from "next/head";

import { Layout } from "components/shared";

import { SectionContents } from "components/content";

export default function Popular() {
  const isMobileDevice = window ? window.innerWidth <= 500 : false;
  return (
    <SectionContents
      section="popular"
      category="tv"
      head_line="인기 TV 프로그램"
      isMobile={isMobileDevice}
    />
  );
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
  );
};
