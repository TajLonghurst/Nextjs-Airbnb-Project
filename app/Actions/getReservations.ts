import prisma from "@/app/Libs/Prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  autherId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, autherId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (autherId) {
      query.autherId = { userId: autherId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const safeReservations = reservations.map((reservation) => {
      return {
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toDateString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
      };
    });
    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
