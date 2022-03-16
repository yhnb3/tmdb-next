import * as React from 'react'
import SearchContent from '../SearchContent'
import Content from './Content'
import Pagination from './Pagination'

interface Content {
  title? : string,
  name? : string,
  poster_path: string,
  id: string,
  release_date? : string,
  first_air_date? : string,
  overview:string,
}

interface ContentPage {
  total_pages: number,
  results: Array<Content>
}

interface Props {
  contents : Array<ContentPage>,
  currentPage: number,
  handlePage: (page:number) => void
  isMobile: boolean,
}

const ContentResult: React.FC<Props> = ({ contents, currentPage, handlePage, isMobile } : Props) => {
  console.log(contents)
  return <div>
      {contents[currentPage-1].results.map((element: Content) => (
        isMobile ? <SearchContent key={element.id} content={element}/> : <Content key={element.id} content={element} />
      ))}
      {contents[0].total_pages > 1 ? (
        <Pagination
          page={currentPage}
          totalPage={contents[0].total_pages}
          handlePage={handlePage} />
      ) : (
        <></>
      )}
    </div>
}
    

export default ContentResult
