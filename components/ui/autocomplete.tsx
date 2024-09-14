import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "./command";
import { Input } from "./input";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { Skeleton } from "./skeleton";

type Props<T extends string> = {
    selectedValue: T;
    onSelectedValueChange: (value: T) => void;
    searchValue: string;
    onSearchValueChange: (value: string) => void;
    items: { value: T; label: string }[];
    isLoading?: boolean;
    emptyMessage?: string;
    placeholder?: string;
};

// Forward ref to the Input component
export const AutoComplete = React.forwardRef<HTMLInputElement, Props<string>>(
    (
        {
            selectedValue,
            onSelectedValueChange,
            searchValue,
            onSearchValueChange,
            items,
            isLoading,
            emptyMessage = "No items.",
            placeholder = "Search...",
        },
        ref // Adding the ref to the forwardRef function
    ) => {
        const [open, setOpen] = useState(false);

        const labels = useMemo(
            () =>
                items.reduce((acc, item) => {
                    acc[item.value] = item.label;
                    return acc;
                }, {} as Record<string, string>),
            [items]
        );

        const reset = () => {
            onSelectedValueChange("" as string);
            onSearchValueChange("");
        };

        const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            if (
                !e.relatedTarget?.hasAttribute("cmdk-list") &&
                labels[selectedValue] !== searchValue
            ) {
                reset();
            }
        };

        const onSelectItem = (inputValue: string) => {
            if (inputValue === selectedValue) {
                reset();
            } else {
                onSelectedValueChange(inputValue as string);
                onSearchValueChange(labels[inputValue] ?? "");
            }
            setOpen(false);
        };

        return (
            <div className="flex items-center">
                <Popover open={open} onOpenChange={setOpen}>
                    <Command shouldFilter={false}>
                        <PopoverAnchor asChild>
                            <CommandPrimitive.Input
                                asChild
                                value={searchValue}
                                onValueChange={onSearchValueChange}
                                onKeyDown={(e) => setOpen(e.key !== "Escape")}
                                onMouseDown={() => setOpen((open) => !!searchValue || !open)}
                                onFocus={() => setOpen(true)}
                                onBlur={onInputBlur}
                            // Attach the ref to the Input component
                            >
                                <Input ref={ref} placeholder={placeholder} />
                            </CommandPrimitive.Input>
                        </PopoverAnchor>
                        {!open && <CommandList aria-hidden="true" className="hidden" />}
                        <PopoverContent
                            asChild
                            onOpenAutoFocus={(e) => e.preventDefault()}
                            onInteractOutside={(e) => {
                                if (
                                    e.target instanceof Element &&
                                    e.target.hasAttribute("cmdk-input")
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            className="w-[--radix-popover-trigger-width] p-0"
                        >
                            <CommandList>
                                {isLoading && (
                                    <CommandPrimitive.Loading>
                                        <div className="p-1">
                                            <Skeleton className="h-6 w-full" />
                                        </div>
                                    </CommandPrimitive.Loading>
                                )}
                                {items.length > 0 && !isLoading ? (
                                    <CommandGroup>
                                        {items.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.value}
                                                onMouseDown={(e) => e.preventDefault()}
                                                onSelect={onSelectItem}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedValue === option.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                ) : null}
                                {!isLoading ? (
                                    <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
                                ) : null}
                            </CommandList>
                        </PopoverContent>
                    </Command>
                </Popover>
            </div>
        );
    }
);

// Provide displayName for easier debugging
AutoComplete.displayName = "AutoComplete";
