import type { ReactElement } from 'react'
import { GetServerSideProps } from 'next/types';
import { useRouter } from 'next/router'

import Layout from '../../components/Layout';
import useFetchData from '../../hooks/useFetchData';

import PersonDetail from '../../components/person/PersonDetail';
import axios from 'axios';
import Head from 'next/head';


export default function Detail({data}){
  // console.log(sd)
  // const router = useRouter()
  // const { id } = router.query
  // const endPoint = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`;
  // const {data, error, loading} = useFetchData({endPoint})

  // if (loading) return <p>로딩중</p>
  
  return <>
    <Head>
      <title>{data.name}</title>
    </Head>
    <PersonDetail person={data} />
  </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await axios.get(`https://api.themoviedb.org/3/person/${context.params.id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`).then(res => res.data)
  return {
    props: {
      data
    }
  }
}
Detail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div className="w-screen mx-auto">
      {page}
      </div>
    </Layout>
  )
}