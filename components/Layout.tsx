import * as React from 'react'
import Footer from './Footer'
import Header from './Header'
import dynamic from 'next/dynamic'

import { useRouter } from 'next/router'
import isMobile from '../libs/isMobile'

interface Props {
  children: React.ReactNode
}

const MobileSide = dynamic(() => import('./MobileSide'))

function Layout({children} : Props){
  const [sideVisible, setSideVisible] = React.useState(false);
  const [cnt, setCnt] = React.useState(0)

  const isMobileDevice = isMobile()

  const router= useRouter();
  const handleSide = () => {
    setCnt(cnt+1)
    setSideVisible(!sideVisible);
  };

  React.useEffect(() => setSideVisible(false), [router])

  return (
    <>
    <Header handleSide={handleSide}/>
    {isMobileDevice ? <MobileSide handleSide={handleSide} count={cnt} sideVisible={sideVisible} /> : null}
    <main className='pt-20 pb-28 mobile:pt-10'>
      {children}
    </main>
    <Footer />
    </>
    
  )
}

export default Layout