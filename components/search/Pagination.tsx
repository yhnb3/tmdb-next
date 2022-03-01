import * as React from 'react';
import { CgArrowLeft } from '@react-icons/all-files/cg/CgArrowLeft';
import { CgArrowRight } from '@react-icons/all-files/cg/CgArrowRight';

interface Props {
  page: number,
  totalPage: number,
  handlePage: (page: number) => void
}

export default function pagination({ page, totalPage, handlePage }:Props) {
  const pages = [...Array(totalPage)].map((_, idx) => idx + 1);

  return (
    <div className="mx-auto mt-10">
      <div className="flex flex-row justify-center">
        {page !== 1 ? (
          <div
            className="flex flex-row"
            role="button"
            onClick={() => handlePage(page - 1)}
            onKeyDown={() => handlePage(page - 1)}
          >
            <CgArrowLeft className="h-full" />
            <p className="font-bold">이전</p>
          </div>
        ) : (
          <></>
        )}
        {pages.map((element) => (
          <div
            role="button"
            onClick={() => handlePage(element)}
            onKeyDown={() => handlePage(element)}
            key={element}
          >
            <p
              className={`w-6 h-6 text-center text-sm ${
                element === page ? 'border border-black' : 'font-bold'
              }`}
            >
              {element}
            </p>
          </div>
        ))}
        {page !== totalPage ? (
          <div
            className="flex flex-row"
            role="button"
            onClick={() => handlePage(page + 1)}
            onKeyDown={() => handlePage(page + 1)}
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
