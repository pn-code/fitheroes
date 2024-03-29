import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs";
import { foodEntrySchema } from "../../../validations/foodEntryValidator";

export async function GET() {
  try {
    const user = await currentUser();

    if (user) {
      const foodEntries = await prisma.foodEntry.findMany({
        where: {
          userId: user.id,
        },
      });

      return NextResponse.json(foodEntries);
    }

    // If user could not be found
    return NextResponse.json(
      { error: "Unable to complete action" },
      { status: 403 }
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (user) {
      const res = await req.json();
      const validateFoodEntry = foodEntrySchema.parse(res);

      if (validateFoodEntry) {
        const newFoodEntry = await prisma.foodEntry.create({
          data: {
            name: res.name,
            calories: res.calories,
            carbs: res.carbs,
            fats: res.fats,
            protein: res.protein,
            userId: user.id,
            date: res.date
          },
        });

        return NextResponse.json(newFoodEntry);
      }

      // If could not be validated
      return NextResponse.json(
        { error: "Unable to complete action" },
        { status: 403 }
      );
    }

    // If user could not be found
    return NextResponse.json(
      { error: "Unable to complete action" },
      { status: 403 }
    );
  } catch (error) {
    // If user could not be found
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await currentUser();
    const res = await req.json();

    if (!user) throw Error("This action is forbidden.");

    // Check to see if this entry is this user's
    const foundEntryOwner = await prisma.foodEntry.findFirst({
      where: { id: res.id },
      select: {
        userId: true,
      },
    });

    if (foundEntryOwner?.userId != user.id) return NextResponse.error();

    const foodEntry = await prisma.foodEntry.delete({
      where: {
        id: res.id,
      },
    });

    return NextResponse.json(foodEntry);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
