import { ReactElement } from "react";
import { GetServerSideProps } from "next/types";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import { Layout } from "components/shared";
import { PersonDetail, PersonMobileDetail } from "components/person";
import { useIsMobile, useFetchData } from "hooks";
import Loading from "components/content/Loading";

export default function Detail() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { id } = router.query;
  const endPoint = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`;
  const { data, loading } = useFetchData({ endPoint });

  const detailPage = isMobile ? (
    <PersonMobileDetail person={data} />
  ) : (
    <PersonDetail person={data} />
  );

  if (loading) return <Loading />;

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
      {detailPage}
    </>
  );
}

Detail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div className="mx-auto">{page}</div>
    </Layout>
  );
};
