import { ReactElement, useEffect } from 'react'
import {useState} from 'react'
import { GetServerSideProps } from 'next/types';
import Head from "next/head";
import { useRouter } from 'next/router'

import isMobile from '../libs/isMobile';

import { FaSearch } from '@react-icons/all-files/fa/FaSearch';

import Layout from '../components/Layout';

import useSearchInfiniteFetchData from '../hooks/useSearchInfiniteFetchData';

import ResultSummary from '../components/search/ResultSummary';
import SearchResult from '../components/search/SearchResult';


export default function Search ({isMobileDevice}) {
  const router = useRouter()
  const { query } = router.query
  console.log(1)
  const [inputValue, setInputValue] = useState(query)
  const [currentSection, setCurrentSection] = useState('movie');
  
  const {data: movieData, error: movieError, loading: movieLoading, setSize: movieSetSize, size: movieSize, initialLoading: movieInitialLoading} = useSearchInfiniteFetchData({category: 'movie', query : query})
  const {data: tvData, error: tvError, loading: tvLoading, setSize: tvSetSize, size: tvSize, initialLoading: tvInitialLoading} = useSearchInfiniteFetchData({category: 'tv', query : query})
  const {data: personData, error: personError, loading: personLoading, setSize: personSetSize, size: personSize, initialLoading: personInitialLoading} = useSearchInfiniteFetchData({category: 'person', query : query})

  const initialLoading = movieInitialLoading || tvInitialLoading || personInitialLoading

  const loading = movieLoading || tvLoading || personLoading

  useEffect(() => {
    let section = 'movie'
    if (!loading && movieData && tvData && personData) {
      if (personData[0].results.length > 0) {
        section = 'person'
      }
      if (tvData[0].results.length > 0) {
        section = 'tv'
      }
      if (movieData[0].results.length > 0) {
        section = 'movie'
      }
    }
    setCurrentSection(section)
  }, [loading])

  return (
    <div>
      <Head>
        <title>{query}</title>
        <meta name="description" content="Helmet application" />
      </Head>
      <div className="flex border-b">
        <div className="flex w-screen mx-auto mobile:w-full">
          <div className="flex">
            <FaSearch className="w-3 h-3 my-auto mx-3" />
          </div>
          <form action="/search?" className="h-10 w-full">
            <input
              className="text-gray-400 h-full outline-none"
              type="text"
              name="query"
              autoComplete="off"
              placeholder="영화, tv 프로그램 검색..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="flex flex-row w-screen mx-auto mobile:flex-col mobile:w-full">
        <div className="w-4/12 pt-10 pr-10 mobile:w-full mobile:p-0">
          <div className="rounded-lg border border-gray-200 mobile:rounded-none">
            <div className="h-16 w-full bg-blue-400 rounded-t-lg flex items-center mobile:rounded-none">
              <div className="ml-4 text-white font-bold">Search Result</div>
            </div>
            <div>
              <div className="mt-2 my-5 mobile:flex-row mobile:flex mobile:my-0">
                {initialLoading ? null : <ResultSummary movieData={movieData} personData={personData} tvData={tvData} currentSection={currentSection} handleCurrentSection={setCurrentSection} />}
              </div>
            </div>
          </div>
        </div>
        <div className="w-8/12 mobile:w-full mobile:px-5">
          <SearchResult isMobile={isMobileDevice} currentSection={currentSection} tvData={tvData} movieData={movieData} personData={personData} movieCurrentPage={movieSize} movieSetCurrentPage={movieSetSize} tvCurrentPage={tvSize} tvSetCurrentPage={tvSetSize} personCurrentPage={personSize} personSetCurrentPage={personSetSize} loading={loading}/>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isMobileDevice = isMobile(context.req)
  return {
    props: {
      isMobileDevice,
    }
  }
}

Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

