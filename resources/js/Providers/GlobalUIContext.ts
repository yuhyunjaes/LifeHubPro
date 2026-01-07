import { createContext, Dispatch, SetStateAction } from "react";

export interface GlobalUIContextType {
    alertSwitch: boolean;
    alertMessage: string;
    alertType: "success" | "danger" | "info" | "warning";
    loading: boolean;

    setAlertSwitch: Dispatch<SetStateAction<boolean>>;
    setAlertMessage: Dispatch<SetStateAction<string>>;
    setAlertType: Dispatch<SetStateAction<"success" | "danger" | "info" | "warning">>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export const GlobalUIContext =
    createContext<GlobalUIContextType | null>(null);
