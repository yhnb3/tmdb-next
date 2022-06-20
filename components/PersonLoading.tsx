import * as React from "react";

export default function PersonLoading() {
  const items = Array(20)
    .fill(1)
    .map((element, idx) => idx + element);
  return (
    <div className="grid grid-cols-5 place-items-center mobile:grid-cols-2">
      {items.map((element) => (
        <div
          className="w-person h-person bg-gray-300 my-5 animate-blink mobile:w-40 mobile:h-auto"
          key={element}
        />
      ))}
    </div>
  );
}
