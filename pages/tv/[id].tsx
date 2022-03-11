import type { ReactElement } from 'react'
import { GetServerSideProps } from 'next/types';
import axios from 'axios';

import Layout from '../../components/Layout';
import DetailPage from '../../components/detail/DetailPage';
import { Content } from '../../components/detail/types'
import isMobile from '../../libs/isMobile';

interface Props {
  data: Content,
  isMobileDevice: boolean
}


export default function TvDetail({data, isMobileDevice} : Props){
  return <DetailPage content={data} isMobile={isMobileDevice}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isMobileDevice = isMobile(context.req)
  const data = await axios.get(`https://api.themoviedb.org/3/tv/${context.params.id}?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`).then(res => res.data)
  return {
    props: {
      data,
      isMobileDevice
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