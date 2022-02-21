import * as React from 'react'
import Link from 'next/Link';

interface Menu {
  name: string,
  url: string,
}

interface Props {
  category: string,
  menus: Array<Menu>,
  isVisible: boolean,
}


export default function DropMenu({ category, menus, isVisible } : Props) {
  return (
    <div
      className={`absolute bg-white top-16 z-60 border border-gray-200 px-3 py-1 rounded-lg ${
        isVisible ? 'visible' : 'invisible'
      }`}
    >
      {menus.map((element : Menu) => (
        <div key={element.name} className="my-2 mx-2 w-full">
          <Link
            href={`/${category}/${element.url}`}
          >
            <p>{element.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
