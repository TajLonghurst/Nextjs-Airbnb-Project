"use client";

import { FC, useCallback, useState } from "react";
import { safeListsing, safeUser } from "../Types";
import { useRouter } from "next/navigation";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../Components/Listings/ListingCard";

interface PropertiesClientProps {
  listings: safeListsing[];
  currentUser?: safeUser | null;
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);
        await axios.delete(`/api/listings/${id}`);
        toast.success("listing deleted");
        router.refresh();
        setDeletingId("");
      } catch (error: any) {
        toast.error(error?.response?.data.error);
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listings) => {
          return (
            <ListingCard
              key={listings.id}
              data={listings}
              actionId={listings.id}
              onAction={onCancel}
              disabled={deletingId == listings.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
