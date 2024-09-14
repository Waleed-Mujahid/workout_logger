import { Calendar, Clipboard, Clock, Flame } from 'lucide-react';

import { WorkoutSession } from '@/db/types';

interface ViewContentProps {
    session: WorkoutSession;
}

const ViewContent: React.FC<ViewContentProps> = ({ session }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 p-4 border border-gray-300 rounded-lg shadow-sm">
        <p className="flex items-center space-x-2">
            <Calendar className="text-gray-500" size={18} />
            <span>{new Date(session.date).toLocaleDateString()}</span>
        </p>
        {session.HITT_rounds && (
            <p className="flex items-center space-x-2">
                <span className="font-semibold">Rounds:</span>
                <span>{session.HITT_rounds}</span>
            </p>
        )}
        <p className="flex items-center space-x-2">
            <Clock className="text-gray-500" size={18} />
            <span>{session.total_duration} min</span>
        </p>
        {session.HITT_rest && (
            <p className="flex items-center space-x-2">
                <span className="font-semibold">Rest:</span>
                <span>{session.HITT_rest} min</span>
            </p>
        )}
        <p className="flex items-center space-x-2">
            <Flame className="text-gray-500" size={18} />
            <span>{session.calories_burned} cal</span>
        </p>
        {session.yoga_style && (
            <p className="flex items-center space-x-2">
                <span className="font-semibold">Style:</span>
                <span>{session.yoga_style}</span>
            </p>
        )}
        {session.notes && (
            <p className="col-span-2 flex items-start border-t border-gray-200 pt-4">
                <Clipboard className="text-gray-500 mr-2" size={18} />
                <span className="flex-1">{session.notes}</span>
            </p>
        )}
    </div>
);

export default ViewContent;