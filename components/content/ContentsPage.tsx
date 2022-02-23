import * as React from "react";

import Layout from '../Layout';
import InfiniteScroll from '../InfinityScroll'
import SectionContents from './SectionContents';
import useInfiniteFetchData from '../../hooks/useInfiniteFetchData';

interface Props {
  section: string,
  category: string,
  head_line: string,
} 

export default function ContentsPage({section, category, head_line} : Props) {
  const { data, error, isLoading, size, setSize} = useInfiniteFetchData({section, category})

  return (
  <div className="mx-auto w-screen pt-10 mobile:px-5 mobile:w-full">
    <div className="text-3xl font-bold none mobile:block mobile:text-xl">
      {head_line}
    </div>
    <InfiniteScroll
      isLoading={isLoading}
      error={error}
      size={size}
      dataLen={data.length}
      setSize={setSize}
    >
      <SectionContents data={data}/>
    </InfiniteScroll>
  </div>
  );
}
