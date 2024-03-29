import type { ReactElement } from "react";
import Head from "next/head";

import { Layout } from "components/shared";
import { SectionContents } from "components/content";

export default function NowPlaying() {
  return (
    <SectionContents
      section="now_playing"
      category="movie"
      head_line="현재 상영 영화"
    />
  );
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
  );
};
