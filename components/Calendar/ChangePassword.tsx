import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { passwordChange } from '@/db/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordSchema, ChangePasswordFormData } from '@/lib/schema';
import {
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const ChangePassword = ({ closeDialog }: { closeDialog: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(ChangePasswordSchema),
    });

    const onSubmit = async (data: ChangePasswordFormData) => {
        try {
            await passwordChange(data);
            // toast.success('User information updated successfully');
            closeDialog();
        } catch (error) {
            console.error(error);
            // toast.error('An error occurred. Please try again');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
                <DialogTitle>Edit User Information</DialogTitle>
            </DialogHeader>

            <div className="form-item space-y-3">
                <Label htmlFor="oldPassword">Old Password</Label>
                <Input
                    id="oldPassword"
                    type="password"
                    {...register('old_password')}
                />
                {errors.old_password && (
                    <p className="text-destructive">
                        {errors.old_password.message}
                    </p>
                )}
            </div>

            <div className="form-item space-y-3">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                    id="newPassword"
                    type="password"
                    {...register('new_password')}
                    className="mt-1 block w-full"
                />
                {errors.new_password && (
                    <p className="text-destructive">
                        {errors.new_password.message}
                    </p>
                )}
            </div>

            <div className="form-item space-y-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    {...register('confirm_password')}
                    className="mt-1 block w-full"
                />
                {errors.confirm_password && (
                    <p className="text-destructive">
                        {errors.confirm_password.message}
                    </p>
                )}
            </div>

            <DialogFooter className="space-x-2">
                <DialogClose asChild>
                    <Button variant="destructive">Cancel</Button>
                </DialogClose>
                <Button variant={'secondary'} type="submit">
                    Save Changes
                </Button>
            </DialogFooter>
        </form>
    );
};

export default ChangePassword;
