import getCurrentUser from "@/app/Actions/getCurrentUser";
import getListingById from "@/app/Actions/getListingById";
import EmptyState from "@/app/Components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/Actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const resveration = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      resverations={resveration}
    />
  );
};

export default ListingPage;
