
import * as React from "react";
import Head from "next/head";

import { useRouter } from 'next/router'
import useFetchData from '../../hooks/useFetchData'

import ContentDetail from './ContentDetail'
// import ContentMobileDetail from '../../components/detail/ContentMobileDetail'

interface Props {
  section: string,
}

const DetailPage = ({section} : Props) =>{
  const router = useRouter()
  const { id } = router.query
  const endPoint = `https://api.themoviedb.org/3/${section}/${id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`;
  const { data, error, loading} = useFetchData({endPoint})

  if (loading) return <p>로딩중....</p>;
  if (error) return <p>데이터를 불러오는데 실패하였습니다.</p>;

  // if (typeof window !== "undefined" && window.innerWidth <= 500) return <ContentMobileDetail content={data} />;
  return <>
    <Head>
      <title>{data.title}</title>
      <meta name="description" content="Helmet application" />
    </Head>
    <ContentDetail content={data} section={section}/>;
  </>
}

export default DetailPage
