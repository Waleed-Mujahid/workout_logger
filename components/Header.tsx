import React from 'react';

import Link from 'next/link';

import { Options } from './Options';
import SearchBarParent from './SearchBarParent';


export const Header: React.FC = () => (
  <header className="fixed bg-background border-b px-6 py-4 flex items-center justify-between z-50 w-full h-16">
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
      <Options />
    </div>
  </header>
);

