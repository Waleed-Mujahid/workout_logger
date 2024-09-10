import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { passwordChange } from '@/db/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from "@/components/shared/LoadingButton"
import { ChangePasswordFormData, ChangePasswordSchema } from '@/lib/schema';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ChangePassword = ({ closeDialog }: { closeDialog: () => void }) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(ChangePasswordSchema),
    });

    const onSubmit = async (data: ChangePasswordFormData) => {
        try {
            setLoading(true);
            await passwordChange(data);
            toast({
                title: 'Password changed successfully',
            });
            closeDialog();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                title: 'Error changing password',
                description: error.message,
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className="mt-4">
                <DialogTitle>Change your password</DialogTitle>
            </DialogHeader>

            <DialogDescription className="form-item space-y-3">
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
            </DialogDescription>
            <DialogFooter className="space-x-2">
                <DialogClose asChild>
                    <Button variant="destructive">Cancel</Button>
                </DialogClose>
                <LoadingButton loading={loading} variant={'secondary'} type="submit">
                    Save Changes
                </LoadingButton>
            </DialogFooter>
        </form>
    );
};

export default ChangePassword;
