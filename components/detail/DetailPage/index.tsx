import Head from "next/head";

import ContentDetail from "./ContentDetail";
import ContentMobileDetail from "./ContentMobileDetail";
import { Content } from "../types";

interface Props {
  content: Content;
  isMobile: boolean;
}

const DetailPage = ({ content, isMobile }: Props) => {
  const title = content.title || content.name;
  const section = content.title ? "movie" : "tv";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {isMobile ? (
        <ContentMobileDetail content={content} />
      ) : (
        <ContentDetail content={content} section={section} />
      )}
    </>
  );
};

export default DetailPage;
