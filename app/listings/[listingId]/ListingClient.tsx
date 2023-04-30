"use client";

import { FC, useCallback, useMemo, useState, useEffect } from "react";
import { safeListsing, safeUser } from "@/app/Types";
import { Reservation } from "@prisma/client";
import { categories } from "@/app/Components/Navbar/Categories";
import Container from "@/app/Components/Container";
import ListingHead from "@/app/Components/Listings/ListingHead";
import ListingInfo from "@/app/Components/Listings/ListingInfo";
import useLoginModal from "@/app/Hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  resverations?: Reservation[];
  listing: safeListsing & {
    user: safeUser;
  };
  currentUser?: safeUser | null;
}

const ListingClient: FC<ListingClientProps> = ({
  resverations = [],
  listing,
  currentUser,
}) => {
  const loginModel = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    resverations.forEach((resveration) => {
      const range = eachDayOfInterval({
        start: new Date(resveration.startDate),
        end: new Date(resveration.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [resverations]);

  const [isLoading, setIsloading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateResveration = useCallback(async () => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    setIsloading(true);
    try {
      await axios.post("/api/resvervations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      });

      toast.success("Listing Reserved");
      setDateRange(initialDateRange);

      //Redirect to /trips
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
    }
    setIsloading(false);
  }, [loginModel, dateRange, currentUser, listing?.id, totalPrice, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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
