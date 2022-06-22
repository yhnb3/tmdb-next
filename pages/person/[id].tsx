import type { ReactElement } from "react";
import { GetServerSideProps } from "next/types";
import Head from "next/head";
import axios from "axios";

import { Layout } from "components/shared";
import { isMobile } from "libs";
import { PersonDetail, PersonMobileDetail } from "components/person";

export default function Detail({ data, isMobileDevice }) {
  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
      {isMobileDevice ? (
        <PersonMobileDetail person={data} />
      ) : (
        <PersonDetail person={data} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isMobileDevice = isMobile(context.req);
  const data = await axios
    .get(
      `https://api.themoviedb.org/3/person/${context.params.id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`
    )
    .then((res) => res.data);
  return {
    props: {
      data,
      isMobileDevice,
    },
  };
};
Detail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div className="mx-auto">{page}</div>
    </Layout>
  );
};
