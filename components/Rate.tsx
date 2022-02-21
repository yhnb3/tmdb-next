import * as React from 'react'
import RateCircle from './RateCircle'

interface Props {
  score: number,
  times: number
}

const Rate = ({score, times} : Props) => {
  let color = 'green';

  if (score < 7) {
    color = 'yellow';
  }

  if (score < 4) {
    color = 'red';
  }

  return (
    <div className="absolute w-6 h-6 left-1 bottom-1 z-10">
      <RateCircle score={score} color={color} times={times} />
    </div>
  );
};

export default React.memo(Rate)