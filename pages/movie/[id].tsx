import type { ReactElement } from "react";
import { GetServerSideProps } from "next/types";
import axios from "axios";

import { Layout } from "components/shared";
import { DetailPage } from "components/detail";
import { Content } from "components/detail/types";
import { isMobile } from "libs";

interface Props {
  data: Content;
  isMobileDevice: boolean;
}

export default function MovieDetail({ data, isMobileDevice }: Props) {
  return <DetailPage content={data} isMobile={isMobileDevice} />;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const isMobileDevice = isMobile(context.req);
  const data = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${context.params.id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`
    )
    .then((res) => res.data);
  return {
    props: {
      data,
      isMobileDevice,
    },
  };
};

MovieDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
