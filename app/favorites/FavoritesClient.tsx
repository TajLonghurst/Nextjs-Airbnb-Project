"use client";

import { FC } from "react";
import { safeListsing, safeUser } from "../Types";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import ListingCard from "../Components/Listings/ListingCard";

interface FavoritesClientProps {
  listings: safeListsing[];
  currentUser?: safeUser | null;
}

const FavoritesClient: FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="A list of places you have favorited"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default FavoritesClient;
