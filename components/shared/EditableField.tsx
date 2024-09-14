import React, { useEffect, useState } from 'react';

import { z } from 'zod';

import { Input } from '@/components/ui/input';

const numberSchema = z.string().refine(
    (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 0;
    },
    {
        message: "Must be a non-negative number",
    }
);

interface EditableFieldProps {
    value: string | number | undefined;
    onChange: (newValue: string) => void;
    label: string;
    type?: string;
    editable?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
    value,
    onChange,
    label,
    type = "text",
    editable = true
}) => {
    const [tempValue, setTempValue] = useState(value?.toString() || '');
    const [error, setError] = useState<string | null>(null);

    const validateAndSetValue = (val: string) => {
        if (type === 'number') {
            const result = numberSchema.safeParse(val);
            if (result.success) {
                setError(null);
                return val;
            } else {
                setError(result.error.errors[0].message);
                return tempValue;
            }
        }
        return val;
    };

    const handleBlur = () => {
        if (editable) {
            const validatedValue = validateAndSetValue(tempValue);
            onChange(validatedValue);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setTempValue(newValue);
        if (type === 'number') {
            validateAndSetValue(newValue);
        }
    };

    useEffect(() => {
        setTempValue(value?.toString() || '');
        setError(null);
    }, [value]);

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center space-x-2 w-full">
                <span className="text-gray-500 w-1/3">{label}:</span>
                <Input
                    type={type}
                    value={tempValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!editable}
                    className={`border p-2 rounded-lg w-2/3 ${error ? 'border-red-500' : ''}`}
                />
            </div>
            {error && <span className="text-destructive text-sm mt-1">{error}</span>}
        </div>
    );
};

export default EditableField;