import {EventsData, ReminderEventsData} from "../../CalenoteSectionsData";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";

interface ReminderViewProps {
    events: EventsData[];
    reminderEvents: ReminderEventsData[];
    now: Date;
}
export default function ReminderView({ events, reminderEvents, now }:ReminderViewProps) {
    const [searchReminder, setSearchReminder] = useState<string>("");
    const koreanDate:String[] = [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토",
    ];
    return (
        <>
            <div className="text-xs font-semibold normal-text space-x-1 sticky top-0">
                <FontAwesomeIcon icon={faClock} />

                <span>
                        {now.getFullYear()}.
                    {(now.getMonth()+1 > 9) ? now.getMonth()+1 : `0${now.getMonth()+1}`}.
                    {(now.getDate() > 9) ? now.getDate() : `0${now.getDate()}`}
                    ({koreanDate[now.getDay()]})
                    </span>

                <span>
                        {(now.getHours() > 9) ? now.getHours() : `0${now.getHours()}`}:
                    {(now.getMinutes() > 9) ? now.getMinutes() : `0${now.getMinutes()}`}
                    </span>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-5">
                {(() => {
                    const afterNowEvents: EventsData[] = events.filter(event => {
                        const eventDate = new Date(event.start_at);
                        const today = new Date(now);

                        eventDate.setHours(0, 0, 0, 0);
                        today.setHours(0, 0, 0, 0);

                        return eventDate.getTime() >= today.getTime();
                    });

                    const eventStartAtDates: Date[] = afterNowEvents
                        .map(e => new Date(e.start_at))
                        .filter((date, index, self) =>
                                index === self.findIndex(d =>
                                    d.getFullYear() === date.getFullYear() &&
                                    d.getMonth() === date.getMonth() &&
                                    d.getDate() === date.getDate()
                                )
                        )
                        .sort((a, b) => a.getTime() - b.getTime());

                    return(
                        eventStartAtDates.map((eventStartAtDate, index) => {
                            const today = eventStartAtDate.getFullYear() === now.getFullYear() &&
                                eventStartAtDate.getMonth() === now.getMonth() &&
                                eventStartAtDate.getDate() === now.getDate();

                            const sameYear = eventStartAtDate.getFullYear() === now.getFullYear();

                            const eventStartIncludeAfterNowEvents:EventsData[] = afterNowEvents.filter(afterNowEvent => {
                                const startAt = new Date(afterNowEvent.start_at);

                                startAt.setHours(0, 0, 0, 0);
                                const eventDate = new Date(eventStartAtDate);
                                eventDate.setHours(0, 0, 0, 0);

                                return startAt.getTime() === eventDate.getTime();
                            })

                            return(
                                <div key={index} className="space-y-2">
                                    <p className="text-xs font-semibold normal-text">{today ? "오늘" : (sameYear ? `${(eventStartAtDate.getMonth()+1 > 9) ? eventStartAtDate.getMonth()+1 : `0${eventStartAtDate.getMonth()+1}`} ${(eventStartAtDate.getDate() > 9) ? eventStartAtDate.getDate() : `0${eventStartAtDate.getDate()}`}(${koreanDate[eventStartAtDate.getDay()]})` : `${eventStartAtDate.getFullYear()} ${(eventStartAtDate.getMonth()+1 > 9) ? eventStartAtDate.getMonth()+1 : `0${eventStartAtDate.getMonth()+1}`} ${(eventStartAtDate.getDate() > 9) ? eventStartAtDate.getDate() : `0${eventStartAtDate.getDate()}`}`)}</p>
                                    {eventStartIncludeAfterNowEvents.map((eventStartIncludeAfterNowEvent, index) => {
                                        const startAt = new Date(eventStartIncludeAfterNowEvent.start_at);
                                        const endAt = new Date(eventStartIncludeAfterNowEvent.end_at);

                                        return(
                                            <div key={index} className="flex flex-row">
                                                <div className={`w-[4px] ${eventStartIncludeAfterNowEvent.color} rounded`}></div>
                                                <div className="flex-1 px-2">
                                                    <p className={`text-sm font-semibold ${eventStartIncludeAfterNowEvent.title ? "normal-text" : "text-gray-500"}`}>{eventStartIncludeAfterNowEvent.title ? eventStartIncludeAfterNowEvent.title : "이벤트 제목"}</p>
                                                    <p className="text-gray-500 text-xs font-semibold">
                                                        <span>
                                                            {startAt.getFullYear()}.
                                                            {(startAt.getMonth()+1 > 9) ? startAt.getMonth()+1 : `0${startAt.getMonth()+1}`}.
                                                            {(startAt.getDate() > 9) ? startAt.getDate() : `0${startAt.getDate()}`}
                                                            ({koreanDate[startAt.getDay()]})

                                                            {(startAt.getHours() > 9) ? startAt.getHours() : `0${startAt.getHours()}`}:
                                                            {(startAt.getMinutes() > 9) ? startAt.getMinutes() : `0${startAt.getMinutes()}`}
                                                        </span>
                                                        ~ <br/>
                                                        <span>
                                                            {endAt.getFullYear()}.
                                                            {(endAt.getMonth()+1 > 9) ? endAt.getMonth()+1 : `0${endAt.getMonth()+1}`}.
                                                            {(endAt.getDate() > 9) ? endAt.getDate() : `0${endAt.getDate()}`}
                                                            ({koreanDate[endAt.getDay()]})

                                                            {(endAt.getHours() > 9) ? endAt.getHours() : `0${endAt.getHours()}`}:
                                                            {(endAt.getMinutes() > 9) ? endAt.getMinutes() : `0${endAt.getMinutes()}`}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })
                    );
                })()}
            </div>
        </>
    );
}
