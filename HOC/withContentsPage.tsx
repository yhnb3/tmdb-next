import * as React from "react";

import InfiniteScroll from '../components/InfinityScroll'

import useInfiniteFetchData from '../hooks/useInfiniteFetchData';

interface withContentsPageProps {
  section: string,
  category: string,
  head_line: string,
} 

const withContentsPage = <P extends object>(Component: React.ComponentType<P>) => {
  const WithContentsPage = ({section, category, head_line, ...props} : withContentsPageProps) => {
    const { data, error, isLoading, size, setSize} = useInfiniteFetchData({section, category});

    return (
      <div className="mx-auto w-screen pt-10 mobile:px-5 mobile:w-full">
        <p className="text-4xl font-bold none mobile:block mobile:text-xl">
          {head_line}
        </p>
        <InfiniteScroll
          isLoading={isLoading}
          error={error}
          size={size}
          dataLen={data.length}
          setSize={setSize}
        >
          <Component data={data} {...props as P}/>
        </InfiniteScroll>
      </div>
    )
  }
  return WithContentsPage
}

export default withContentsPage
