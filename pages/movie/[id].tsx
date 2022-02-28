import type { ReactElement } from 'react'
import * as React from "react";

import Layout from '../../components/Layout';
import DetailPage from '../../components/detail/DetailPage';

export default function MovieDetail(){
  return <DetailPage section="movie" />
}

MovieDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}