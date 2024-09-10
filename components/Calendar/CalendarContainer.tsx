import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import Calendar from './Calendar';

import './styles.css';

function CalendarContainer() {
    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3" id="Calendar">
            <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View your upcoming workouts and events.</CardDescription>
            </CardHeader>
            <CardContent className='calendarContainer'>
                <Calendar />
            </CardContent>
        </Card >
    )
}

export default CalendarContainer