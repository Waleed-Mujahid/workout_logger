
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SearchIcon } from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: string;
}

interface SearchBarClientProps {
  initialResults: SearchResult[];
  initialError: string | null;
}

export function SearchBarClient({ initialResults }: SearchBarClientProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [value, setValue] = React.useState("");
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredResults(
      initialResults.filter(exercise =>
        exercise.title.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, initialResults]);

  return (
    <div className="relative w-full max-w-sm">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button onClick={() => setOpen(true)} variant={'ghost'}>
            <SearchIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent ref={popoverRef} className="w-[250px] relative -top-11 right-16">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search exercise..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="mt-2">
            {filteredResults.length > 0 ? (
              <div>
                {filteredResults.map((exercise) => (
                  <div
                    key={exercise.id}
                    onClick={() => {
                      setValue(exercise.title);
                      setOpen(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {exercise.title}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2 text-gray-500">No exercise found.</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}