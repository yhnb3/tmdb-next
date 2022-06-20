import { CgArrowLeft } from "@react-icons/all-files/cg/CgArrowLeft";
import { CgArrowRight } from "@react-icons/all-files/cg/CgArrowRight";
import { KeyboardEvent, MouseEvent } from "react";

interface Props {
  page: number;
  totalPage: number;
  handlePage: (page: number) => void;
}

export default function pagination({ page, totalPage, handlePage }: Props) {
  const pages = [...Array(totalPage)].map((_, idx) => idx + 1);

  const handlePageWithTarget = (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => {
    const { page } = event.currentTarget.dataset;
    handlePage(Number(page));
  };

  const handlePageDown = () => {
    handlePage(page - 1);
  };

  const handlePageUp = () => {
    handlePage(page + 1);
  };

  return (
    <div className="mx-auto mt-10">
      <div className="flex flex-row justify-center">
        {page !== 1 ? (
          <div
            className="flex flex-row"
            role="button"
            onClick={handlePageDown}
            onKeyDown={handlePageDown}
          >
            <CgArrowLeft className="h-full" />
            <p className="font-bold">이전</p>
          </div>
        ) : (
          <></>
        )}
        {pages.map((element) => (
          <button
            type="button"
            data-page={element}
            onClick={handlePageWithTarget}
            onKeyDown={handlePageWithTarget}
            key={element}
          >
            <p
              className={`w-6 h-6 text-center text-sm ${
                element === page ? "border border-black" : "font-bold"
              }`}
            >
              {element}
            </p>
          </button>
        ))}
        {page !== totalPage ? (
          <div
            className="flex flex-row"
            role="button"
            onClick={handlePageUp}
            onKeyDown={handlePageUp}
          >
            <p className="font-bold">다음</p>
            <CgArrowRight className="h-full w-4" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
