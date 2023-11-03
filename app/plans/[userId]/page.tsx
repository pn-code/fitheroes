import { GlobeIcon, HammerIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";
import TrainingPlanCard from "@/components/plans/TrainingPlanCard";

export const metadata = {
  title: "Plans | FitHeroes",
};

interface Props {
  params: { userId: string };
}

export default async function Plans({ params }: Props) {
  const user = await clerkClient.users.getUser(params.userId);

  if (!user) {
    notFound();
  }

  async function getUserPlans(): Promise<any> {
    const userPlans = await prisma.trainingPlan.findMany({
      where: { userId: params.userId },
      include: { reviews: true },
    });
    return userPlans;
  }

  async function getSavedPlans(): Promise<any> {
    const savedPlans = await prisma.trainingPlan.findMany({
      where: {
        NOT: { userId: user.id },
        savedByUsers: {
          some: {
            userId: user.id,
          },
        },
      },
      include: { reviews: true },
    });
    return savedPlans;
  }

  const userPlans = await getUserPlans();
  const savedPlans = await getSavedPlans();

  return (
    <main className="w-full min-h-[calc(100vh-90px)] overflow-y-auto mb-12 bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 lg:px-[20%] text-white/90">
      <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
        <h1 className="text-xl sm:text-3xl font-bold">{`${user.firstName} ${user.lastName}'s Plans`}</h1>
        <section className="flex gap-4">
          <Link
            className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 rounded-lg text-white px-2 py-1"
            href="/plans/build"
          >
            <HammerIcon size={16} />
            <span className="font-semibold">Build</span>
          </Link>
          <Link
            className="flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-2 py-1"
            href="/plans/explore"
          >
            <GlobeIcon size={16} />
            <span className="font-semibold">Explore</span>
          </Link>
        </section>
      </header>

      {/* User Plans */}
      <section className="flex flex-col gap-2">
        {userPlans.map((plan: any) => (
          <TrainingPlanCard plan={plan} key={plan.id} />
        ))}
        {userPlans.length === 0 && (
          <p className="text-sm">
            Nothing to see here. Create your first plan to see it here.
          </p>
        )}
      </section>

      {/* Saved Plans */}
      <section className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-3xl font-bold pb-2 border-b-2 border-b-indigo-600">
          Saved Plans
        </h1>
        {savedPlans.map((plan: any) => (
          <TrainingPlanCard plan={plan} key={plan.id} />
        ))}
        {savedPlans.length === 0 && (
          <p className="text-sm">
            Nothing to see here. Create your first plan to see it here.
          </p>
        )}
      </section>
    </main>
  );
}
