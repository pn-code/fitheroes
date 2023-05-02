import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";
import { weightSchema } from "../../../validations/weightValidator";

export async function GET() {
    try {
        const user = await currentUser();

        if (user) {
            const allWeights = await prisma.weightMeasurement.findMany({
                where: {
                    userId: user.id,
                },
            });

            return NextResponse.json(allWeights);
        }
    } catch (error) {
        return console.error(error);
    }
}

export async function POST(req: Request) {
    try {
        const user = await currentUser();

        if (user) {
            const res = await req.json();

            const validateWeight = weightSchema.parse(res.weight);

            if (validateWeight) {
                const newWeightMeasurement =
                    await prisma.weightMeasurement.create({
                        data: {
                            weight: res.weight,
                            userId: user.id,
                        },
                    });

                return NextResponse.json(newWeightMeasurement);
            }
        }
    } catch (error) {
        return console.error(error);
    }
}
