"use client";
import axios from "axios";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
    planId: number;
    isSaved: boolean;
}

export default function SavePlanButton({ planId, isSaved }: Props) {
    const [hasCurrentUserSaved, setHasCurrentUserSaved] =
        useState<boolean>(isSaved);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSave = async () => {
        try {
            setLoading(true);
            // If saved, delete user...
            if (hasCurrentUserSaved) {
                const res = await axios.delete(`/api/plans/${planId}/users`);
                if (res.status === 200) {
                    setHasCurrentUserSaved(false);
                    toast.success("Successfully unsaved plan.");
                    router.refresh();
                }
            }

            // If not saved, create user with attached planId...
            if (!hasCurrentUserSaved) {
                const res = await axios.post(`/api/plans/${planId}/users`);
                if (res.status === 200) {
                    setHasCurrentUserSaved(true);
                    toast.success("Successfully saved plan.");
                    router.refresh();
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            disabled={loading}
            onClick={handleSave}
            type="button"
            className="px-4 py-1 rounded-md flex gap-2 bg-gray-900/70 items-center hover:bg-gray-700 disabled:bg-gray-500"
        >
            <Save color={hasCurrentUserSaved ? "#ffdf00" : "#ffffff"} />
            <p className={hasCurrentUserSaved ? "text-amber-300" : ""}>
                {hasCurrentUserSaved ? "Saved" : "Save Plan"}
            </p>
        </button>
    );
}
