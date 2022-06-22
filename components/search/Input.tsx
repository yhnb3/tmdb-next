import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { ChangeEvent, useState } from "react";

interface IProps {
  query: string | string[];
}

const Input = ({ query }: IProps) => {
  const [inputValue, setInputValue] = useState(query);

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setInputValue(value);
  };

  return (
    <div className="flex border-b">
      <div className="flex w-screen mx-auto mobile:w-full">
        <div className="flex">
          <FaSearch className="w-3 h-3 my-auto mx-3" />
        </div>
        <form action="/search?" className="h-10 w-full">
          <input
            className="text-gray-400 h-full outline-none"
            type="text"
            name="query"
            autoComplete="off"
            placeholder="영화, tv 프로그램 검색..."
            value={inputValue}
            onChange={handleInputValue}
          />
        </form>
      </div>
    </div>
  );
};

export default Input;
