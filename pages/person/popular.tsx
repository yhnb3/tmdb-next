import type { ReactElement } from "react";
import Head from "next/head";

import { Layout } from "components/shared";
import { PersonContents } from "components/content";

export default function Popular() {
  return (
    <PersonContents section="popular" category="person" head_line="인기 인물" />
  );
}

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
