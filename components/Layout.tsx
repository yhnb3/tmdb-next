import * as React from 'react'
import Footer from './Footer'
import Header from './Header'

import { useRouter } from 'next/router'

interface Props {
  children: React.ReactNode
}

function Layout({children} : Props){
  const [sideVisible, setSideVisible] = React.useState(undefined);
  const router= useRouter();
  const handleSide = () => {
    setSideVisible(!sideVisible);
  };

  React.useEffect(() => setSideVisible(false), [router])

  return (
    <>
    <Header handleSide={handleSide}/>
    <main className='pt-20 pb-28 mobile:pt-10'>
      {children}
    </main>
    <Footer />
    </>
    
  )
}

export default Layout