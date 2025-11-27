// 캘린더 영역
import CalendarTitleSection from "./Sections/Calendar/CalendarTitleSection";

import { Head } from '@inertiajs/react';
import {AuthUser} from "../../Types/CalenoteTypes";

interface CalendarProps {
    auth: {
        user: AuthUser | null;
    };
}
export default function Calendar({ auth } : CalendarProps) {
    return (
        <>
            <Head title="Calendar"/>
            <div className="min-h-full bg-gray-100 dark:bg-gray-950 relative flex flex-col">
                <CalendarTitleSection />
            </div>
        </>
    );
}
