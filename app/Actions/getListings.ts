import prisma from "@/app/Libs/Prismadb";

export default async function getListings() {
  try {
    const listing = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listing;
  } catch (err: any) {
    throw new Error(err);
  }
}
