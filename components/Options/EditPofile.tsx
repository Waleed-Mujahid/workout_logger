import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { User } from '@/db/types';
import { editUser } from '@/db/auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from "@/components/shared/LoadingButton"
import { EditUserFormData, EditUserSchema } from '@/lib/schema';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import LoadingDialog from './LoadingDialog';

interface EditUserProps {
    userData: User | undefined;
    closeDialog: () => void;
}

const EditProfile = ({ userData, closeDialog }: EditUserProps) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditUserFormData>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            name: userData?.name || '',
            height: userData?.height,
            weight: userData?.weight,
        },
    });

    const onSubmit = async (data: EditUserFormData) => {
        setLoading(true);
        try {
            const updatedUser = {
                ...userData,
                ...data,
            };
            await editUser(updatedUser);
            toast({
                title: 'User information updated successfully',
            });
            closeDialog();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast({
                title: 'Error updating user information',
                description: error.message,
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return <LoadingDialog />
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <DialogHeader className="mt-4">
                    <DialogTitle>Edit User Information</DialogTitle>
                </DialogHeader>
                <DialogDescription className="form-item space-y-3">
                    <div className="form-item space-y-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            {...register('name')}
                            placeholder="Enter your name"
                            className="w-full text-foreground"
                        />
                        {errors.name && (
                            <p className="text-destructive">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="form-item space-y-3">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                            id="height"
                            type="number"
                            {...register('height')}
                            placeholder="Enter your height"
                            className="w-full text-foreground"
                        />
                        {errors.height && (
                            <p className="text-destructive">
                                {errors.height.message}
                            </p>
                        )}
                    </div>

                    <div className="form-item space-y-3">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                            id="weight"
                            type="number"
                            {...register('weight')}
                            placeholder="Enter your weight "
                            className="w-full text-foreground"
                        />
                        {errors.weight && (
                            <p className="text-destructive">
                                {errors.weight.message}
                            </p>
                        )}
                    </div>

                </DialogDescription >
                <DialogFooter className="space-x-2">
                    <DialogClose asChild>
                        <Button variant="destructive">Cancel</Button>
                    </DialogClose>
                    <LoadingButton loading={loading} variant={'secondary'} type="submit">
                        Save Changes
                    </LoadingButton>
                </DialogFooter>
            </form>
        </>
    );
};

export default EditProfile;
