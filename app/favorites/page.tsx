import { FC } from "react";
import EmptyState from "../Components/EmptyState";

import getCurrentUser from "../Actions/getCurrentUser";
import getFavoriteListings from "../Actions/getFavoriteListing";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorite found"
        subtitle="Looks like you have no favorite listings"
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default ListingPage;
