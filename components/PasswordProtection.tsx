"use client";

import React, { useState, useEffect } from "react";

// IPs that should trigger restricted (password-protected) mode
const RESTRICTED_IPS = ["66.60.183.126"];

export default function PasswordProtection({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRestricted, setIsRestricted] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAccess = async () => {
            // Check localStorage first
            const auth = localStorage.getItem("site_auth");
            if (auth === "true") {
                setIsAuthenticated(true);
                setIsLoading(false);
                return;
            }

            // Fetch the visitor's public IP
            try {
                const res = await fetch("https://api.ipify.org?format=json");
                const data = await res.json();
                const visitorIp = data.ip;

                if (RESTRICTED_IPS.includes(visitorIp)) {
                    setIsRestricted(true);
                } else {
                    // Not on a restricted network — let them through
                    setIsAuthenticated(true);
                }
            } catch {
                // If IP lookup fails, let them through (fail-open)
                setIsAuthenticated(true);
            }

            setIsLoading(false);
        };

        checkAccess();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "portfolio") {
            setIsAuthenticated(true);
            localStorage.setItem("site_auth", "true");
            setError(false);
        } else {
            setError(true);
            setPassword("");
        }
    };

    if (isLoading) {
        return null;
    }

    if (isAuthenticated) {
        return <>{children}</>;
    }

    if (!isRestricted) {
        return <>{children}</>;
    }

    return (
        <div className="relative min-h-screen">
            <div className="filter blur-md pointer-events-none select-none h-screen overflow-hidden">
                {children}
            </div>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md mx-4">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Restricted Access
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(false);
                                }}
                                placeholder="Enter password"
                                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm text-center font-medium animate-pulse">
                                Incorrect password. Please try again.
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-blue-500/30"
                        >
                            Enter Site
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
