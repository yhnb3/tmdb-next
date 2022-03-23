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
      {seasons.length > 0 ? seasons.map((element) => (
        <SeasonSection content={element} key={element.id} />
      )) : <p className='mt-2'>지난 시즌에 대한 정보가 없습니다.</p>}
    </div>
  </div>



export default SeasonsContainer