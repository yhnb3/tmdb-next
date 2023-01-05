import { FormEventHandler, useRef } from "react";

import { useRouter } from "next/router";

import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

interface IProps {
  query: string | string[];
}

const Input = ({ query }: IProps) => {
  const queryString = query as string;
  const inputRef = useRef(null);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) return;
    inputRef.current &&
      router.push({
        pathname: "/search",
        query: { query: inputRef.current.value },
      });
  };

  return (
    <div className="flex border-b">
      <div className="flex w-screen mx-auto mobile:w-full">
        <div className="flex">
          <FaSearch className="w-3 h-3 my-auto mx-3" />
        </div>
        <form onSubmit={handleSubmit} className="h-10 w-full">
          <input
            ref={inputRef}
            className="text-gray-400 h-full outline-none"
            type="text"
            name="query"
            autoComplete="off"
            placeholder={queryString}
          />
        </form>
      </div>
    </div>
  );
};

export default Input;
