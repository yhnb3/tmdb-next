import Head from "next/head";

import ContentDetail from './ContentDetail'
// import ContentMobileDetail from '../../components/detail/ContentMobileDetail'
import {Content} from './types'

interface Props {
  content: Content
}

const DetailPage = ({content} : Props) =>{
  const title = content.title || content.name
  const section = content.title ? "movie" : "tv"
  // if (typeof window !== "undefined" && window.innerWidth <= 500) return <ContentMobileDetail content={data} />;
  return <>
    <Head>
      <title>{title}</title>
      <meta name="description" content="Helmet application" />
    </Head>
    <ContentDetail content={content} section={section}/>;
  </>
}

export default DetailPage
