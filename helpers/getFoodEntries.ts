import { prisma } from "../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";
import getLocalTimezone from "../helpers/getLocalTimezone";

const getFoodEntries = async () => {
	try {
		const user = await currentUser();
		if (!user) throw Error("This action is forbidden.");

		const localTime = getLocalTimezone();

		const foodEntry = await prisma.foodEntry.findMany({
			where: {
				userId: user.id,
				date: {
					gte: localTime.startOfDay,
					lt: localTime.endOfDay,
				},
			},
		});

		return foodEntry;
	} catch (error) {
		console.error(error);
	}
};

export default getFoodEntries;
