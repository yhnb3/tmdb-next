import * as React from 'react'
import ContentListContainer from './ContentListContainer'

interface Section {
  name: string,
  title: string,
  target: string,
  datas: {
    상영중: any,
    TV: any
  } | {
    오늘: any,
    이번주: any
  } | any
}

interface Props {
  sectionList: Array<Section>
}

const SectionList = ({ sectionList } : Props) => (
  <div>
    {sectionList.map((sectionItem) => (
      <ContentListContainer
        key={sectionItem.name}
        target={sectionItem.target}
        title={sectionItem.title}
        datas={sectionItem.datas}
        name={sectionItem.name}
        categories={Object.keys(sectionItem.datas)}
      />
    ))}
  </div>
);

export default SectionList