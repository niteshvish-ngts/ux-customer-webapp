import BottomNavbar from '@/components/common/bottom-navbar/page'
import Footer from '@/components/common/footer/page'
import Navbar2 from '@/components/common/navbar2/page'
import ServicePage from '@/components/service/page'
import React from 'react'

export default function Service(){
  return (
    <>
    <Navbar2 />
    <div><ServicePage/></div>

    <Footer />
      <BottomNavbar />
    </>
  )
}
