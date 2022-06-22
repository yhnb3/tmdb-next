import RateCircle from "./RateCircle";

interface Props {
  score: number;
  times: number;
  bottom?: number;
  top?: number;
  left?: number;
  right?: number;
}

const Rate = ({
  score,
  times,
  bottom = 0,
  left = 0,
  top = 0,
  right = 0,
}: Props) => {
  let color = "green";

  if (score < 7) {
    color = "yellow";
  }

  if (score < 4) {
    color = "red";
  }

  return (
    <div
      className={`absolute left-${left} bottom-${bottom} top-${top} right-${right} z-10`}
    >
      <RateCircle score={score} color={color} times={times} />
    </div>
  );
};

export default Rate;
