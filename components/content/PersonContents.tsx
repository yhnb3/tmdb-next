import * as React from 'react'

import withContentsPage from '../../HOC/withContentsPage'
import PersonList from '../PersonList'

interface Person {
  id: string,
  profile_path: string,
  name: string,
  known_for: Array<{name? : string, title? : string}>,
}


const PersonContents = ({data}) => {
  return data.map((element : {page:number, results : Array<Person>}) => (
    <PersonList key={element.page} persons={element.results} />
  ))
}

export default withContentsPage(PersonContents)