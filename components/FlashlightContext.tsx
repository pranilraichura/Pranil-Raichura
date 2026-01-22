"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface FlashlightContextType {
    isEnabled: boolean;
    toggleFlashlight: () => void;
}

const FlashlightContext = createContext<FlashlightContextType | undefined>(undefined);

export function FlashlightProvider({ children }: { children: ReactNode }) {
    const [isEnabled, setIsEnabled] = useState(true);

    const toggleFlashlight = () => {
        setIsEnabled((prev) => !prev);
    };

    return (
        <FlashlightContext.Provider value={{ isEnabled, toggleFlashlight }}>
            {children}
        </FlashlightContext.Provider>
    );
}

export function useFlashlight() {
    const context = useContext(FlashlightContext);
    if (context === undefined) {
        throw new Error("useFlashlight must be used within a FlashlightProvider");
    }
    return context;
}
