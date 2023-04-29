"use client";

import { FC, useMemo } from "react";
import { safeListsing, safeUser } from "@/app/Types";
import { Reservation } from "@prisma/client";
import { categories } from "@/app/Components/Navbar/Categories";
import Container from "@/app/Components/Container";
import ListingHead from "@/app/Components/Listings/ListingHead";

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
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
