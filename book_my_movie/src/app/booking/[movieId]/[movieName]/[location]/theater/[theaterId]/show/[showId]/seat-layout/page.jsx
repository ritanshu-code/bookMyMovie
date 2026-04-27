import SeatLayout from "@/components/layout/SeatLayout"
import { getShowById } from "@/services/showService"

export default async function page(props) {
  const params = await props.params;

  const { movieId, movieName, location, theaterId, showId } = await  params
  console.log(movieId)
  console.log(theaterId)
  console.log(showId)
  console.log(movieName)
  console.log(location)

  const showData = await getShowById(showId)
  const safeData = JSON.parse(JSON.stringify(showData));
  



return (
  <>
    {/* Scrollable Seat layout */}
    <SeatLayout showData={safeData} showId={showId} />
  </>
)
}

 