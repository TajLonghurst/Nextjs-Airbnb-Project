"use client";

import { FC, useCallback, useState } from "react";
import { safeReservation, safeUser } from "../Types";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import ListingCard from "../Components/Listings/ListingCard";

interface ReservationsClientProps {
  reservations: safeReservation[];
  currentUser?: safeUser | null;
}

const ReservationsClient: FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);
        await axios.delete(`/api/reservations/${id}`);
        toast.success("Reservation canneled");
        router.refresh();
        setDeletingId("");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking of your properties" />
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
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationsClient;
