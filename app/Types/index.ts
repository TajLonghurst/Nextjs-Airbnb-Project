import { Listing, User } from "@prisma/client";

export type safeListsing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type safeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: String;
  emailVerified: String | null;
};
