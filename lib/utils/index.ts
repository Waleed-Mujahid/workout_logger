import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formattedDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

export const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
};

export function getEventColorScheme(eventType: string) {
    switch (eventType.toLowerCase()) {
        case 'traditional':
            return {
                color: '#3498db',          // Soft blue
                backgroundColor: '#e8f4fd',
                borderColor: '#3498db',
                textColor: '#2980b9'
            };
        case 'yoga':
            return {
                color: '#27ae60',          // Soft green
                backgroundColor: '#e9f7ef',
                borderColor: '#27ae60',
                textColor: '#219653'
            };
        case 'cardio':
            return {
                color: '#e74c3c',          // Soft red
                backgroundColor: '#fde9e7',
                borderColor: '#e74c3c',
                textColor: '#c0392b'
            };
        case 'hiit':
            return {
                color: '#f39c12',          // Soft orange
                backgroundColor: '#fef5e7',
                borderColor: '#f39c12',
                textColor: '#d35400'
            };
        default:
            return {
                color: '#9b59b6',          // Soft purple
                backgroundColor: '#f4ecf7',
                borderColor: '#9b59b6',
                textColor: '#8e44ad'
            };
    }
}

export const calculateHeightInInches = (feet: string, inches: string): number => {
    const feetToInches = parseInt(feet || '0') * 12;
    const inchValue = parseInt(inches || '0');
    const totalInches = feetToInches + inchValue;

    return isNaN(totalInches) ? 0 : totalInches;
};
