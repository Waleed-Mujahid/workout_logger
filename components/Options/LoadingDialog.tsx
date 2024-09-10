import React from 'react';

import { PulseLoader } from 'react-spinners';

import { DialogContent } from '@/components/ui/dialog';

const LoadingDialog = () => {
    return (
        <DialogContent className="flex flex-col items-center justify-center space-y-4 p-8">
            <div className="flex flex-col items-center">
                <PulseLoader color="#4A5568" size={15} />
                <p className="mt-4 text-gray-600">Loading...</p>
            </div>
        </DialogContent>
    );
};

export default LoadingDialog;
