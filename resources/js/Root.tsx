import axios from "axios";
import React, {ReactNode, useEffect, useState, cloneElement, ReactElement} from "react";
import {EventsData, ReminderData} from "./Pages/Calenote/Sections/CalenoteSectionsData";

interface RootProps {
    auth: any;
    children: ReactNode; // 정확히는 ReactElement가 들어옵니다.
    [key: string]: any;
}

export default function Root({ auth, children, ...props }: RootProps) {
    const [events, setEvents] = useState<EventsData[]>([]);
    const [reminders, setReminders] = useState<ReminderData[]>([]);
    const [getEventDone, setGetEventDone] = useState<boolean>(false);
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const getEvents:()=>Promise<void> = async ():Promise<void> => {
        try {
            const res = await axios.get("/api/events");
            if(res.data.success) {
                const currentEvents = res.data.events;
                if(currentEvents.length <= 0) return;
                setEvents(currentEvents);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setGetEventDone(true);
        }
    }

    const getEventReminders:()=>Promise<void> = async ():Promise<void> => {
        try {
            const res = await axios.get("/api/event/reminders");
            if(res.data.success) {
                setReminders(res.data.reminders);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getEvents();
        getEventReminders();
    }, []);

    const sharedProps = {
        auth,
        events,
        setEvents,
        reminders,
        setReminders,
        getEventDone,
        setGetEventDone,
        now,
        setNow,
        ...props
    };

    return (
        <>
            {React.isValidElement(children)
                ? cloneElement(children as ReactElement, sharedProps)
                : children}
        </>
    );
}
