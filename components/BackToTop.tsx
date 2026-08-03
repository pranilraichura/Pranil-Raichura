"use client";

import { useState, useEffect } from 'react';
import { useLightbox } from './LightboxContext';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { isLightboxOpen } = useLightbox();

    useEffect(() => {
        let frame = 0;
        const toggleVisibility = () => {
            frame = 0;
            const next = window.pageYOffset > 300;
            setIsVisible((current) => current === next ? current : next);
        };
        const scheduleVisibility = () => {
            if (!frame) frame = window.requestAnimationFrame(toggleVisibility);
        };

        toggleVisibility();
        window.addEventListener('scroll', scheduleVisibility, { passive: true });

        return () => {
            window.removeEventListener('scroll', scheduleVisibility);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Hide when lightbox is open
    if (isLightboxOpen) {
        return null;
    }

    return (
        <button
            onClick={scrollToTop}
            className={`back-to-top ${isVisible ? 'visible' : ''}`}
            aria-label="Back to top"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </button>
    );
}
