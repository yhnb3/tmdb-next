import type { ReactElement } from "react";
import Head from "next/head";

import { Layout } from "components/shared";

import { SectionContents } from "components/content";

export default function Popular() {
  return (
    <SectionContents
      section="popular"
      category="tv"
      head_line="인기 TV 프로그램"
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
