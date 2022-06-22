import type { ReactElement } from "react";
import { GetServerSideProps } from "next/types";
import Head from "next/head";

import { Layout } from "components/shared";
import { PersonContents } from "components/content";
import { isMobile } from "libs";

export default function Popular({ isMobileDevice }) {
  return (
    <PersonContents
      section="popular"
      category="person"
      head_line="인기 인물"
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
        <title>인기 인물</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  );
};
