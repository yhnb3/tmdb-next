import type { ReactElement } from 'react'
import * as React from "react";
import Head from "next/head";
import { useRouter } from 'next/router'

import { FaSearch } from '@react-icons/all-files/fa/FaSearch';
import { BsDot } from '@react-icons/all-files/bs/BsDot';

import Layout from '../components/Layout';

import useSearchInfiniteFetchData from '../hooks/useSearchInfiniteFetchData';

import ResultSummary from '../components/search/ResultSummary';


export default function Search () {
  const router = useRouter()
  const { query } = router.query
  
  const [currentSection, setCurrentSection] = React.useState('movie');

  const {data: movieData, error: movieError, loading: movieLoading, setSize: movieSetSize, size: movieSize, initialLoading: movieInitialLoading} = useSearchInfiniteFetchData({category: 'movie', query : query})
  const {data: tvData, error: tvError, loading: tvLoading, setSize: tvSetSize, size: tvSize, initialLoading: tvInitialLoading} = useSearchInfiniteFetchData({category: 'tv', query : query})
  const {data: personData, error: personError, loading: personLoading, setSize: personSetSize, size: personSize, initialLoading: personInitialLoading} = useSearchInfiniteFetchData({category: 'person', query : query})

  const loading = movieInitialLoading || tvInitialLoading || personInitialLoading

  console.log(movieData, movieError, movieLoading)
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
              placeholder="영화, tv 프로그램 검색..."
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
                {loading ? null : <ResultSummary movieData={movieData} personData={personData} tvData={tvData} currentSection={currentSection} handleCurrentSection={setCurrentSection} />}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-8/12 mobile:w-full mobile:px-5">
          <Result />
        </div> */}
      </div>
    </div>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>TMDB BY KANGWOO</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {page}
    </Layout>
  )
}

