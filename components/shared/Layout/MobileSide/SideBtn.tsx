import Link from "next/link";

interface IProps {
  href: string;
  name: string;
  handleSide: () => void;
}

const SideBtn = ({ href, name, handleSide }: IProps) => {
  return (
    <li>
      <Link href={href} passHref>
        <button className="my-1" onClick={handleSide}>
          {name}
        </button>
      </Link>
    </li>
  );
};

export default SideBtn;
