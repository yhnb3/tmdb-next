import type { ReactElement } from "react";
import { Layout } from "components/shared";
import { DetailPage } from "components/detail";
import { useFetchData, useIsMobile } from "hooks";
import { useRouter } from "next/router";
import Loading from "components/content/Loading";

export default function MovieDetail() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { id } = router.query;
  const endPoint = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`;
  const { data, loading } = useFetchData({ endPoint });

  if (loading) return <Loading />;
  return <DetailPage content={data} isMobile={isMobile} />;
}

MovieDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
