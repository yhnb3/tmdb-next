import * as React from 'react'

import SeasonSection from './SeasonSection'

interface Season {
  name: string,
  poster_path: string,
  id: string,
  air_date: string,
}

interface Props {
  seasons: Array<Season>
}

const SeasonsContainer: React.FC<Props> = ({seasons}: Props) => 
  <div className="mx-2">
    <p className="text-xl font-bold">지난 시즌</p>
    <div>
      {seasons.map((element) => (
        <SeasonSection content={element} key={element.id} />
      ))}
    </div>
  </div>



export default SeasonsContainer