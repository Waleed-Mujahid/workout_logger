import React from 'react';
import ScramblingNumber from './ScramblingNumber';


interface SummaryItemProps {
    title: string;
    value: number | string | undefined;
    unit?: string;
    isLoading: boolean;
}

const SummaryItem: React.FC<SummaryItemProps> = ({ title, value, unit = '', isLoading }) => {

    return (
        <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm font-medium text-muted-foreground">{title}</div>
            <div className="text-3xl font-bold">
                {isLoading ? (
                    <ScramblingNumber />
                ) : (
                    `${value}${unit}`
                )}
            </div>
        </div>
    );
}

export default SummaryItem;
