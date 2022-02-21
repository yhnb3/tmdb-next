import * as React from 'react'
import ContentListContainer from './ContentListContainer'

interface Section {
  name: string,
  title: string,
  target: string,
  urls: {
    상영중: string,
    TV: string
  } | {
    오늘: string,
    이번주: string
  }
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
        urls={sectionItem.urls}
        name={sectionItem.name}
        categories={Object.keys(sectionItem.urls)}
      />
    ))}
  </div>
);

export default SectionList