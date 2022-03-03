import type { ReactElement } from 'react'
import * as React from "react";
import Head from "next/head";
import { useRouter } from 'next/router'

import Layout from '../../components/Layout';
import useFetchData from '../../hooks/useFetchData';

import PersonDetail from '../../components/person/PersonDetail';


export default function Detail(){
  const router = useRouter()
  const { id } = router.query
  console.log(router)
  const endPoint = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`;
  const {data, error, loading} = useFetchData({endPoint})

  // if (loading) return <p>로딩중</p>
  
  // return <PersonDetail person={data} />
  return <p>{data.name}</p>
}

Detail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}