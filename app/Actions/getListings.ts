import prisma from "@/app/Libs/Prismadb";

export default async function getListings() {
  try {
    const listing = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListsings = listing.map((listing) => {
      return {
        ...listing,
        createdAt: listing.createdAt.toISOString(),
      };
    });
    return safeListsings;
  } catch (err: any) {
    throw new Error(err);
  }
}
