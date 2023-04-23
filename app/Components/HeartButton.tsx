"use client";

import { FC } from "react";
import { safeUser } from "../Types";

interface HeartButtonProps {
  listingId: String;
  currentUser?: safeUser | null;
}

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const hasFavourited = false;
  const toggleFavorite = () => {};
  return <div>HeartButton</div>;
};

export default HeartButton;
