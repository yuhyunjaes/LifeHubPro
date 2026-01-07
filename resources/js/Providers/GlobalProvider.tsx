import {ReactNode, useEffect, useState} from "react";
import { GlobalUIContext } from "./GlobalUIContext";

interface GlobalProviderProps {
    children: ReactNode;
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
    const [alertSwitch, setAlertSwitch] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertType, setAlertType] = useState<"success" | "danger" | "info" | "warning">("success");
    const [loading, setLoading] = useState(false);

    return (
        <GlobalUIContext.Provider
            value={{
                alertSwitch,
                alertMessage,
                alertType,
                loading,
                setAlertSwitch,
                setAlertMessage,
                setAlertType,
                setLoading,
            }}
        >
            {children}
        </GlobalUIContext.Provider>
    );
}

