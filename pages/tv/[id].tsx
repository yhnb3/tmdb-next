import type { ReactElement } from 'react'
import { GetServerSideProps } from 'next/types';
import axios from 'axios';

import Layout from '../../components/Layout';
import DetailPage from '../../components/detail/DetailPage';
import { Content } from '../../components/detail/types'

interface Props {
  data: Content
}

export default function TvDetail({data} : Props){
  return <DetailPage content={data} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await axios.get(`https://api.themoviedb.org/3/tv/${context.params.id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`).then(res => res.data)
  return {
    props: {
      data
    }
  }
}

TvDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}