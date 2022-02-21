import * as React from 'react';
import Rate from '../Rate';

const NoPoster = () => (
  <div className="h-list">
    <div className="relative h-img w-img top-0 flex-col whitespace-normal shadow-md rounded-lg">
      <img
        className="rounded-lg object-cover w-img h-full mx-auto"
        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
        alt="noImage"
      />
      <Rate times={1} score={0} />
    </div>
  </div>
);

export default function Loading() {
  return (
    <div>
      {[...Array(6)].map((_, index) => (
        <div className="inline-flex px-5" key={index}>
          <NoPoster />
        </div>
      ))}
    </div>
  );
}
