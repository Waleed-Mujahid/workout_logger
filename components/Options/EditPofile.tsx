import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { User } from '@/db/types';
import { editUser } from '@/db/auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { calculateHeightInInches } from '@/lib/utils';
import LoadingButton from "@/components/shared/LoadingButton";
import { EditUserFormData, EditUserSchema } from '@/lib/schema';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import LoadingDialog from './LoadingDialog';

interface EditUserProps {
    userData: User | undefined;
    closeDialog: () => void;
    refetchUserData: () => void;
}

const EditProfile = ({ userData, closeDialog, refetchUserData }: EditUserProps) => {
    const [loading, setLoading] = useState(false);
    const [feet, setFeet] = useState<string>('');
    const [inches, setInches] = useState<string>('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EditUserFormData>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            name: userData?.name || '',
            height: userData?.height || 0, // Assuming height is stored in inches in DB
            weight: userData?.weight || 0,
        },
    });

    // Convert stored height to feet and inches for display
    useEffect(() => {
        if (userData?.height) {
            const heightInInches = userData.height;
            const computedFeet = Math.floor(heightInInches / 12);
            const computedInches = heightInInches % 12;
            setFeet(computedFeet.toString());
            setInches(computedInches.toString());
        }
    }, [userData?.height]);

    // Update height in form state when feet or inches change
    useEffect(() => {
        const totalHeightInInches = calculateHeightInInches(feet, inches);
        setValue('height', totalHeightInInches);
    }, [feet, inches, setValue]);

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
            refetchUserData();  // Refetch user data after successful update
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast({
                title: 'Error updating user information',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return <LoadingDialog />;
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
                        <Label htmlFor="height">Height</Label>
                        <div className="flex space-x-4">
                            <div>
                                <Label>Feet</Label>
                                <Input
                                    type="number"
                                    value={feet}
                                    onChange={(e) => setFeet(e.target.value)}
                                    placeholder="Feet"
                                    className="w-full text-foreground"
                                />
                            </div>
                            <div>
                                <Label>Inches</Label>
                                <Input
                                    type="number"
                                    value={inches}
                                    onChange={(e) => setInches(e.target.value)}
                                    placeholder="Inches"
                                    className="w-full text-foreground"
                                />
                            </div>
                        </div>
                        {errors.height && (
                            <p className="text-destructive">
                                {errors.height.message}
                            </p>
                        )}
                    </div>

                    <div className="form-item space-y-3">
                        <Label htmlFor="weight">Weight (Lbs)</Label>
                        <Input
                            id="weight"
                            type="number"
                            {...register('weight')}
                            placeholder="Enter your weight"
                            className="w-full text-foreground"
                        />
                        {errors.weight && (
                            <p className="text-destructive">
                                {errors.weight.message}
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
        </>
    );
};
export default EditProfile;
