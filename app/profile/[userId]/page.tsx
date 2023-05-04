import Image from "next/image";
import SignOutButton from "../../../components/SignOutButton";
import { clerkClient } from "@clerk/nextjs/app-beta";
import StripeCheckOutButton from "../../../components/StripeCheckOutButton";
import { prisma } from "../../../lib/client";
import { Check } from "lucide-react";

interface Props {
    params: {
        userId: string;
    };
}

async function ProfilePage({ params }: Props) {
    const { userId } = params;
    const user = await clerkClient.users.getUser(userId);
    const userIsSubscribed = await prisma.subscription.findFirst({
        where: { userId: user.id },
    });

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Profile</h1>
                <SignOutButton />
            </header>

            {/* User Information */}
            <section className="flex gap-4 items-center">
                <Image
                    className="rounded-full"
                    src={user?.profileImageUrl || ""}
                    alt={`${user?.firstName} profile picture`}
                    width={60}
                    height={60}
                />
                <h2 className="text-2xl font-semibold text-amber-300">
                    {`${user?.firstName} ${user?.lastName}`}
                </h2>
                {userIsSubscribed && (
                    <span className="bg-indigo-600 rounded-full p-1 border-2 border-indigo-700 flex justify-center items-center">
                        <Check />
                    </span>
                )}
            </section>

            {/* User Stats */}

            {/* Upgrade Profile */}
            {!userIsSubscribed && (
                <section className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <section>
                        <h2 className="text-2xl font-semibold text-amber-300">
                            Upgrade account to premium
                        </h2>
                        <p>Gain immediate access to the Builder Page</p>
                    </section>
                    <StripeCheckOutButton />
                </section>
            )}
        </main>
    );
}

export default ProfilePage;