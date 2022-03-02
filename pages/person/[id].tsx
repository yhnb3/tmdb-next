import type { ReactElement } from 'react'
import * as React from "react";
import Head from "next/head";
import { useRouter } from 'next/router'

import Layout from '../../components/Layout';
import useFetchData from '../../hooks/useFetchData';

export default function PersonDetail(){
  const router = useRouter()
  const { id } = router.query
  console.log(router)
  const endPoint = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`;
  const {data, error, loading} = useFetchData({endPoint})

  if (loading) return <p>로딩중</p>
  console.log(data)

  return <>
    <Head>
      <title>{data.name}</title>
      <meta name="description" content="Helmet application" />
    </Head>
    <p>{data.name}</p>
  </>
}

PersonDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}