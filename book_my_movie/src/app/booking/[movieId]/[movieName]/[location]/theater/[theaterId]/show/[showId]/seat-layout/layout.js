import SeatLayoutFooter from "@/app/booking/layout/SeatLayoutFooter";
import SeatLayoutHeader from "@/app/booking/layout/SeatLayoutHeader";
import { getShowById } from "@/services/showService";

export default async function BookingLayout({ children ,params }) {
  
  const {movieName , showId, location} = await params
  console.log("Movie Name:", movieName)
  console.log("Show ID:",showId)

  const showData = await getShowById(showId)
  console.log("showData",showData)
  const safeData = JSON.parse(JSON.stringify(showData));
  
  return (
    <>
      <SeatLayoutHeader params={{ movieName, showId}} showData={safeData}  />
      <SeatLayoutFooter showData={safeData} location={location} />
      {children}
    </>
  )
}