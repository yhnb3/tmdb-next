import * as React from "react";

import InfiniteScroll from '../components/InfinityScroll'

import useInfiniteFetchData from '../hooks/useInfiniteFetchData';

interface withContentsPageProps {
  section: string,
  category: string,
  head_line: string,
  isMobile: boolean,
} 

const withContentsPage = <P extends object>(Component: React.ComponentType<P>) => {
  const WithContentsPage = ({section, category, head_line, isMobile, ...props} : withContentsPageProps) => {
    const { data, error, size, setSize} = useInfiniteFetchData({section, category});

    return (
      <div className={`mx-auto max-w-screeen ${isMobile ? "px-5 w-full mt-10" : "w-screen pt-10"}`}>
        <p className={`${isMobile ? "text-xl" : "text-4xl"} font-bold`}>
          {head_line}
        </p>
        <InfiniteScroll
          error={error}
          size={size}
          dataLen={data.length}
          setSize={setSize}
        >
          <Component data={data} isMobile={isMobile} {...props as P}/>
        </InfiniteScroll>
      </div>
    )
  }
  return WithContentsPage
}

export default withContentsPage
