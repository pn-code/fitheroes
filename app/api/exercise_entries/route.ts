import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";
import { exerciseEntrySchema } from "../../../validations/exerciseEntryValidator";
import getLocalTimezones from "../../../helpers/getLocalTimezone";

export async function GET() {
	try {
		const user = await currentUser();
		const localTime = getLocalTimezones();

		if (user) {
			const exerciseEntries = await prisma.exerciseEntry.findMany({
				where: {
					userId: user.id,
					date: {
						gte: localTime.startOfDay,
						lt: localTime.endOfDay,
					},
				},
			});

			return NextResponse.json(exerciseEntries);
		} else {
			return NextResponse.error();
		}
	} catch (error) {
		return NextResponse.error();
	}
}

export async function POST(req: Request) {
	try {
		const user = await currentUser();

		if (user) {
			const res = await req.json();

			const validateExerciseEntry = exerciseEntrySchema.parse(res);

			if (validateExerciseEntry) {
				const newExerciseEntry = await prisma.exerciseEntry.create({
					data: {
						name: res.name,
						type: res.type,
						duration: res.duration,
						sets: res.sets,
						reps: res.reps,
						weight: res.weight,
						calories: res.calories,
						userId: user.id,
					},
				});

				return NextResponse.json(newExerciseEntry);
			}

			return NextResponse.error()
		}
	} catch (error) {
		return console.error(error);
	}
}
