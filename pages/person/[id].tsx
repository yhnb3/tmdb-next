import type { ReactElement } from 'react'
import { GetServerSideProps } from 'next/types';
import axios from 'axios';

import Head from 'next/head';

import Layout from '../../components/Layout';

import PersonDetail from '../../components/person/PersonDetail';


export default function Detail({data}){ 
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