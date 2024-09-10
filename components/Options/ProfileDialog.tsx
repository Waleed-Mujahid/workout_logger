'use client';
import { useEffect, useState } from 'react';

import { User } from '@/db/types';
import { getUserData } from '@/db/user';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import EditProfile from './EditPofile';
import ChangePassword from './ChangePassword';

interface ProfileDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    closeDialog: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({
    open,
    setOpen,
    closeDialog,
}) => {
    const [userData, setUserData] = useState<User>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Prevent rendering on the server
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserData();
            if (data) {
                setUserData(data);
            }
        };

        fetchData();
    }, []);

    // Prevent the Dialog from rendering on the server
    if (!mounted) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="space-y-4">
                <Tabs defaultValue="edit">
                    <TabsList>
                        <TabsTrigger value="edit">Edit Profile</TabsTrigger>
                        <TabsTrigger value="password">Change Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit">
                        <EditProfile userData={userData} closeDialog={closeDialog} />
                    </TabsContent>
                    <TabsContent value="password">
                        <ChangePassword closeDialog={closeDialog} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileDialog;
