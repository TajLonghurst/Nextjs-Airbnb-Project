"use client";

import { FC, useCallback, useState } from "react";
import { safeReservation, safeUser } from "../Types";
import { useRouter } from "next/navigation";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../Components/Listings/ListingCard";

interface TripsClientProps {
  reservations: safeReservation[];
  currentUser?: safeUser | null;
}

const TripsClient: FC<TripsClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);
        await axios.delete(`/api/reservations/${id}`);
        toast.success("Reservation canncelled");
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
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              resveration={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId == reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
