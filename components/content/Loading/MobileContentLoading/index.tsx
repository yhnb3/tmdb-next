const MobileContentLoading = () => {
  const arr = Array.from({ length: 5 });
  return (
    <div>
      {arr.map((_, idx) => {
        const key = `content_loading-${idx}`;
        return (
          <div
            key={key}
            className="flex mt-5 bg-gray-200 border rounded-md animate-blink w-6/8 h-48 mobile:h-36"
          ></div>
        );
      })}
    </div>
  );
};

export default MobileContentLoading;
