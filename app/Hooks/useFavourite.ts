import axios from "axios";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { safeUser } from "../Types";

import useLoginModal from "./useLoginModal";

interface IUseFavourite {
  listingId: string;
  currentUser?: safeUser | null;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Succsess");
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
    [loginModal, currentUser, hasFavourited, listingId, router]
  );

  return {
    hasFavourited,
    toggleFavourite,
  };
};

export default useFavourite;
