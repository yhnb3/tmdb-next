import Footer from "./Footer";
import Header from "./Header";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useIsMobile } from "hooks";

interface Props {
  children: ReactNode;
}

const MobileSide = dynamic(() => import("./MobileSide"));

function Layout({ children }: Props) {
  const [sideVisible, setSideVisible] = useState<boolean | undefined>(
    undefined
  );
  const [subMenuVisible, setSubMenuVisible] = useState({
    movie: false,
    tv: false,
    person: false,
  });

  const isMobile = useIsMobile();

  const router = useRouter();
  const handleSide = () => {
    if (!sideVisible) {
      setSubMenuVisible({
        movie: false,
        tv: false,
        person: false,
      });
    }
    setSideVisible((prev) => !prev);
  };

  useEffect(() => setSideVisible(undefined), [router]);

  return (
    <div className="min-h-screen relative">
      <Header handleSide={handleSide} />
      {isMobile ? (
        <MobileSide
          handleSide={handleSide}
          sideVisible={sideVisible}
          subMenuVisible={subMenuVisible}
          setSubMenuVisible={setSubMenuVisible}
        />
      ) : null}
      <main className="pt-20 mobile:pt-16 pb-20 mobile:h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
