import SeatLayoutFooter from "../../../../../../../../layout/SeatLayoutFooter";
import SeatLayoutHeader from "../../../../../../../../layout/SeatLayoutHeader";
import { getShowById } from "@/services/showService";

export default async function BookingLayout({ children ,params }) {
  
  const {movieName , showId, location} = await params
  console.log(movieName)
  console.log(showId)

  const showData = await getShowById(showId)
  console.log("showData",showData)
  const safeData = JSON.parse(JSON.stringify(showData));
  
  return (
    <>
      <SeatLayoutHeader params={{ movieName, showId}} showData={showData}  />
      <SeatLayoutFooter showData={safeData} location={location} />
      {children}
    </>
  )
}