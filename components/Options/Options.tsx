'use client';

import { useState } from 'react';

import ProfileDialog from './ProfileDialog';
import ProfilePopover from './ProfilePopover';

export const Options = () => {
    const [open, setOpen] = useState(false);


    const showDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    return (
        <>
            <ProfilePopover onEditProfileClick={showDialog} />
            <ProfileDialog
                open={open}
                setOpen={setOpen}
                closeDialog={closeDialog}
            />
        </>
    );
};
