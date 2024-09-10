// import { toast } from 'sonner';
import { User } from 'lucide-react';

import { signOut } from '@/db/auth';
import { Button } from '@/components/ui/button';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

const ProfilePopover = ({
    onEditProfileClick,
}: {
    onEditProfileClick: () => void;
}) => {

    const handleLogout = () => {
        try {
            signOut();
        } catch (error) {
            console.error('Failed to log out');
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="p-2">
                    <User className="text-primary w-5 h-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="w-48 p-4 bg-background shadow-lg rounded-md"
            >
                <div className="space-y-4">
                    <Button
                        className="w-full"
                        variant="ghost"
                        onClick={onEditProfileClick}
                    >
                        Edit Profile
                    </Button>
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ProfilePopover;
