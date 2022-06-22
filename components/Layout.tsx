import Footer from "./Footer";
import Header from "./Header";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import isMobile from "libs/isMobile";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const MobileSide = dynamic(() => import("./MobileSide"));

function Layout({ children }: Props) {
  const [sideVisible, setSideVisible] = useState(false);
  const [cnt, setCnt] = useState(0);

  const isMobileDevice = isMobile();

  const router = useRouter();
  const handleSide = () => {
    setCnt(cnt + 1);
    setSideVisible(!sideVisible);
  };

  useEffect(() => setSideVisible(false), [router]);

  return (
    <div className="min-h-screen relative">
      <Header handleSide={handleSide} />
      {isMobileDevice ? (
        <MobileSide
          handleSide={handleSide}
          count={cnt}
          sideVisible={sideVisible}
        />
      ) : null}
      <main className="pt-20 pb-28">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
