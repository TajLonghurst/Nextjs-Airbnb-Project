import getCurrentUser from "./Actions/getCurrentUser";
import getListings, { IListingsParams } from "./Actions/getListings";
import Container from "./Components/Container";
import EmptyState from "./Components/EmptyState";
import ListingCard from "./Components/Listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams;
}

export const dynamic = "force-dynamic";

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length == 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-[8rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Home;
