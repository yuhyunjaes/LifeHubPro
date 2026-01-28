import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPen} from "@fortawesome/free-solid-svg-icons";
import {Dispatch, SetStateAction, useCallback, useContext, useEffect, useState} from "react";
import {AuthUser} from "../../../../../Types/CalenoteTypes";
import {ParticipantsData} from "../../CalenoteSectionsData";
import axios from "axios";
import {GlobalUIContext} from "../../../../../Providers/GlobalUIContext";

interface ParticipantControlProps {
    disabled: boolean;
    saveEvent: ()=> Promise<string | undefined>;
    eventId: string | null;
    eventParticipants: ParticipantsData[];
    setEventParticipants: Dispatch<SetStateAction<ParticipantsData[]>>;
    auth: {
        user: AuthUser | null;
    };
}

export default function ParticipantControl({ disabled, saveEvent, eventId, eventParticipants, setEventParticipants, auth }:ParticipantControlProps) {
    const ui = useContext(GlobalUIContext);

    if (!ui) {
        throw new Error("Calendar must be used within GlobalProvider");
    }

    const {
        setAlertSwitch,
        setAlertMessage,
        setAlertType,
        setLoading,
        loading
    } = ui;

    const [IsParticipantFocus, setIsParticipantFocus] = useState<boolean>(false);
    const [IsParticipantEmail, setIsParticipantEmail] = useState<boolean>(false);

    const [participantControl, setParticipantControl] = useState<string>("");


    useEffect(() => {
        function matchesPattern(text:string) {
            return /^\S+@\S+\.\S+$/.test(text);
        }

        setIsParticipantEmail(matchesPattern(participantControl));
    }, [participantControl]);

    // useEffect(() => {
    //     console.log(participants)
    // }, [participants]);

    const eventInvite = useCallback(async (email: string, role: "editor" | "viewer", localEventId?: string) => {
            const currentEventId:string | null = localEventId ?? eventId;

        if(!currentEventId || !email.trim() || (!role.includes('editor') && !role.includes('viewer'))) return;

        const removeSpaceEmail:string = email.trim();

        setLoading(true);

        try {
            const res = await axios.post(`/api/event/${currentEventId}/invitations`, {
                email: removeSpaceEmail,
                role: role
            });

            if(res.data.success) {
                const newParticipantsData:ParticipantsData = {
                    user_name: null,
                    user_id: null,
                    event_id: currentEventId,
                    email: removeSpaceEmail,
                    role: null,
                    status: "pending",
                }

                setEventParticipants(pre => [...pre, newParticipantsData]);
            } else {
                setAlertSwitch(true);
                setAlertType(res.data.type);
                setAlertMessage(res.data.message);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [eventId]);

    return (
        <div className="px-5 flex flex-wrap">
            <label
                htmlFor="participant"
                className="text-xs font-semibold mb-2"
            >
                참가자
            </label>

            {(eventParticipants.length > 0 && auth) ? (
                <div className="mb-2 overflow-x-hidden overflow-y-auto space-y-2 bg-transparent rounded outline-none border-gray-300 w-full dark:border-gray-800 font-semibold text-xs">
                    {eventParticipants.map((eventParticipant, index) => (
                        <div className="border border-gray-200 dark:border-gray-800 group p-2 w-full rounded hover:bg-gray-950/10 dark:hover:bg-gray-600 flex items-center justify-between" key={index}>
                            <div className="flex items-center space-x-1 max-w-[70%]">
                                <div className="size-4 bg-gray-500 rounded-full flex justify-center items-center">
                                    <span className="text-[0.6rem]">{eventParticipant.user_name ? eventParticipant.user_name[0] : eventParticipant.email[0]}</span>
                                </div>
                                <p className="truncate">
                                    {eventParticipant.user_name ? eventParticipant.user_name : eventParticipant.email}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : ""}

            <div className="w-full relative">
                <input
                    disabled={disabled}
                    onFocus={() => { setIsParticipantFocus(true); }}
                    onBlur={() => { setIsParticipantFocus(false); }}
                    type="text"
                    id="participant"
                    value={participantControl}
                    onChange={(e) => { setParticipantControl(e.target.value); }}
                    className="border w-full border-gray-300 dark:border-gray-800 px-1 py-2 rounded bg-transparent text-xs font-semibold outline-none"
                    placeholder="참가자 추가"
                />

                {(IsParticipantFocus && IsParticipantEmail) ?
                    <div className="absolute w-[200px] top-[34px] sm:top-0 sm:right-[calc(100%+0.5rem)] rounded bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800">


                        {(() => {

                            return(
                                <div className="p-2 w-full text-xs hover:bg-gray-950/10 dark:hover:bg-gray-600 rounded flex items-center justify-between group">
                                    <p className="truncate max-w-[70%]">{participantControl}</p>

                                    <div className="space-x-2">
                                        <button disabled={loading} onMouseDown={async () => {
                                    if(!eventParticipants.some(participant => participant.email === participantControl)) {
                                        let localEventId:string | undefined;
                                        if(!eventId) {
                                            localEventId = await saveEvent();
                                        }
                                        await eventInvite(participantControl, "viewer", localEventId);
                                        setParticipantControl("");
                                    }
                                    }} className="cursor-pointer opacity-0 group-hover:opacity-100 hover:text-gray-300">
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button disabled={loading} onMouseDown={async () => {
                                    if(!eventParticipants.some(participant => participant.email === participantControl)) {
                                        let localEventId:string | undefined;
                                        if(!eventId) {
                                            localEventId = await saveEvent();
                                        }
                                        await eventInvite(participantControl, "editor", localEventId);
                                        setParticipantControl("");
                                    }
                                    }} className="cursor-pointer opacity-0 group-hover:opacity-100 hover:text-gray-300">
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })()}
                    </div> : ""}
            </div>
        </div>
    );
}
