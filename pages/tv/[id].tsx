import type { ReactElement } from 'react'
import * as React from "react";

import Layout from '../../components/Layout';
import DetailPage from '../../components/detail/DetailPage';

export default function TvDetail(){
  return <DetailPage section="tv" />
}

TvDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}