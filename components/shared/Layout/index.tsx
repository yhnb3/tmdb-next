import Footer from "./Footer";
import Header from "./Header";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useClickAway, useIsMobile } from "hooks";

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
  const mobileSideRef = useRef();
  const sideBtnRef = useRef();

  const handleSide = useCallback(() => {
    if (!sideVisible) {
      setSubMenuVisible({
        movie: false,
        tv: false,
        person: false,
      });
    }
    setSideVisible((prev) => !prev);
  }, [sideVisible]);

  const closeSide = useCallback(() => {
    setSideVisible((prev) => {
      if (typeof prev === "undefined") return prev;
      return false;
    });
  }, []);

  useClickAway({
    targetRef: mobileSideRef,
    buttonRef: sideBtnRef,
    onClick: closeSide,
  });

  useEffect(() => setSideVisible(undefined), [router]);

  return (
    <div className="min-h-screen relative">
      <Header handleSide={handleSide} sideBtnRef={sideBtnRef} />
      {isMobile ? (
        <MobileSide
          mobileSideRef={mobileSideRef}
          handleSide={handleSide}
          sideVisible={sideVisible}
          subMenuVisible={subMenuVisible}
          setSubMenuVisible={setSubMenuVisible}
        />
      ) : null}
      <main className="pt-20 mobile:pt-16 pb-20 mobile:h-full">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
