import AuctionComponent from '../components/AuctionComponent'
import TopBar from '../components/TopBar'

const AuctionDetails = () => {
  return (
    <>
        <div className='min-h-screen min-w-screen'>
          <TopBar/>
        <AuctionComponent/>
        </div>
    </>
  )
}

export default AuctionDetails