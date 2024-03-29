"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

interface DateSelectorProps {
    selectedDate: string;
    setSelectedDate: (dateString: string) => void;
}

export default function DateSelector({
    selectedDate,
    setSelectedDate,
}: DateSelectorProps) {
    const router = useRouter();

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    return (
        <input
            onChange={(e) => handleDateChange(e)}
            value={selectedDate}
            aria-label="journal date"
            className="btn "
            type="date"
        />
    );
}
