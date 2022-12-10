import type { ReactElement } from "react";
import { GetServerSideProps } from "next/types";
import Head from "next/head";

import { Layout } from "components/shared";
import { SectionContents } from "components/content";
import { isMobile } from "libs";

export default function NowPlaying() {
  const isMobileDevice = window.innerWidth <= 500;
  return (
    <SectionContents
      section="now_playing"
      category="movie"
      head_line="현재 상영 영화"
      isMobile={isMobileDevice}
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
