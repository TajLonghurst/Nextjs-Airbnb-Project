"use client";

import { FC, useMemo } from "react";
import { safeListsing, safeUser } from "@/app/Types";
import { Reservation } from "@prisma/client";
import { categories } from "@/app/Components/Navbar/Categories";
import Container from "@/app/Components/Container";
import ListingHead from "@/app/Components/Listings/ListingHead";
import { list } from "postcss";
import ListingInfo from "@/app/Components/Listings/ListingInfo";

interface ListingClientProps {
  resverations?: Reservation[];
  listing: safeListsing & {
    user: safeUser;
  };
  currentUser?: safeUser | null;
}

const ListingClient: FC<ListingClientProps> = ({
  resverations,
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => {
      return item.label == listing.category;
    });
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto mt-5">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.guestCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
