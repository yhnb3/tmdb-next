import React from "react";
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub";

const Footer = () => (
  <footer className="absolute w-full h-20 bg-blue-900 flex items-center bottom-0">
    <div className="flex items-center mx-auto">
      <div>
        <a
          href="https://github.com/yhnb3/tmdb-next"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub className="h-10 w-10" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
