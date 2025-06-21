import React from 'react'
import TopBar from '../components/TopBar'
import Auction from '../components/Auction'

const AuctionDetails = () => {
  return (
    <>
        <div className='min-h-screen min-w-screen'>
          <TopBar/>
        <Auction/>
        </div>
    </>
  )
}

export default AuctionDetails