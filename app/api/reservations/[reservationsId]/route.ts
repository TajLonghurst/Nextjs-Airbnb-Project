import { NextResponse } from "next/server";
import prisma from "@/app/Libs/Prismadb";
import getCurrentUser from "@/app/Actions/getCurrentUser";

interface IParams {
  reservationsId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationsId } = params;

  if (!reservationsId || typeof reservationsId !== "string") {
    throw new Error("Invalid Id");
  }

  //This is so the creater who posted there reservations can delete their home listing or the person who booked the home can delete their booking
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationsId,
      OR: [
        {
          userId: currentUser.id,
        },
        {
          listing: {
            userId: currentUser.id,
          },
        },
      ],
    },
  });

  return NextResponse.json(reservation);
}
