'use client'
import { User } from '@/db/types';
import { getUserData } from '@/db/user';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import EditProfile from './EditPofile';
import ChangePassword from './ChangePassword';
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserData()
            if (!data) {
                return
            }
            setUserData(data);
        };

        fetchData();
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="space-y-4">
                <Tabs defaultValue="edit">
                    <TabsList>
                        <TabsTrigger value="edit">Edit Profile</TabsTrigger>
                        <TabsTrigger value="password">
                            Change Password
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit">
                        <EditProfile
                            userData={userData}
                            closeDialog={closeDialog}
                        />
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
