import * as React from "react";
import Link from "next/link";

interface Menu {
  name: string;
  url: string;
}

interface Props {
  category: string;
  menus: Array<Menu>;
  isVisible: boolean;
}

export default function DropMenu({ category, menus, isVisible }: Props) {
  return (
    <div
      className={`absolute bg-white top-16 z-60 border border-gray-200 px-3 py-1 rounded-lg ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      {menus.map((element: Menu, idx: number) => {
        const key = `menu-${element.name}-${idx}`;
        return (
          <div key={element.name} className="my-2 mx-2 w-full cursor-pointer">
            <Link href={`/${category}/${element.url}`} passHref>
              <a>
                <p>{element.name}</p>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
