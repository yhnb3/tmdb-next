/* eslint-disable camelcase */
import * as React from 'react';

import {RecommendationSection, SummarySection, CastList, SeasonsContainer, MediaSection} from './components';

export default function Detail({ content, section }) {
  return (
    <div>
      <SummarySection content={content} />
      <div className="w-screen mx-auto">
        <CastList id={content.id} section={section} />
        {content.title ? (
          <MediaSection id={content.id} />
        ) : (
          <SeasonsContainer seasons={content.seasons} />
        )}
        <RecommendationSection id={content.id} section={section} />
      </div>
    </div>
  );
}
