"use client";

import axios from "axios";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Spinner from "@/components/Spinner";

export default function UpdateUsernameComponent() {
    const [isUpdating, setIsUpdating] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const updateUserNames = async () => {
        try {
            setLoading(true);
            const res = await axios.put("/api/users/full_name", {
                firstName,
                lastName,
            });

            if (res.status === 200) {
                toast.success("Successfully updated your name.");
            }

            setIsUpdating(false);
            setFirstName("");
            setLastName("");
            router.refresh();
        } catch (error) {
            console.error(error, "Ran into an error. Try again later.");
            toast.error("Ran into an error. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white border border-primary p-4 rounded-sm shadow-md">
            <section className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <section>
                    <h2 className="text-xl sm:text-2xl font-semibold text-primary">
                        Update Name
                    </h2>
                    <p className="text-sm">
                        In case your name does not look right.
                    </p>
                </section>
                <button
                    onClick={() => setIsUpdating((prev) => !prev)}
                    className="btn text-white bg-green-500 hover:bg-green-600 flex gap-2 items-center"
                >
                    <Edit size={18} />
                    {!isUpdating ? <h3>Update Name</h3> : <h3>Cancel</h3>}
                </button>
            </section>

            {isUpdating && (
                <section className="flex flex-col gap-4 w-full">
                    <section className="flex gap-2">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            min={1}
                            max={30}
                            type="text"
                            id="firstName"
                            value={firstName}
                        />
                    </section>
                    <section className="flex gap-2">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            min={1}
                            max={30}
                            type="text"
                            id="lastName"
                            value={lastName}
                        />
                    </section>
                    <button
                        disabled={loading}
                        onClick={updateUserNames}
                        className="btn btn--primary lg:w-72"
                    >
                        {loading ? <Spinner /> : "Submit New Name"}
                    </button>
                </section>
            )}
        </section>
    );
}
