"use client";

import useCountries from "@/app/Hooks/useCountries";
import { safeUser } from "@/app/Types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, MouseEvent, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  resveration?: Reservation;
  data: Listing;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: safeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  resveration,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId || "");
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (resveration) {
      return resveration.totalPrice;
    }
    return data.price;
  }, [resveration, data.price]);

  const reservationData = useMemo(() => {
    if (!resveration) {
      return null;
    }

    const start = new Date(resveration.startDate);
    const end = new Date(resveration.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [resveration]);

  console.log("LOCATION", location);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full h-full relative overflow-hidden rounded-xl ">
          <Image
            fill
            src={data.imageSrc}
            alt="Listing"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationData || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!resveration && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
