import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SearchBarParent from './SearchBarParent';
import Image from 'next/image';


export const Header: React.FC = () => (
  <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <Link href="#" className="text-2xl font-bold" prefetch={false}>
        Workout Tracker
      </Link>
      <nav className="hidden md:flex items-center gap-4">
        {['Dashboard', 'Workouts', 'Exercises', 'Calendar', 'Goals', 'Log Workout'].map((item) => (
          <Link
            key={item}
            href={`#${item}`}
            className="text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            {item}
          </Link>
        ))}
      </nav>
    </div>
    <div className="flex items-center gap-4">
      <SearchBarParent />
      <Button variant="ghost" size="icon">
        <Image
          src="/placeholder-user.jpg"
          width={32}
          height={32}
          alt="User Avatar"
          className="rounded-full"
          style={{ aspectRatio: "32/32", objectFit: "cover" }}
        />
        <span className="sr-only">User Menu</span>
      </Button>
    </div>
  </header>
);

