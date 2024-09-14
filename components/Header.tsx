import React from 'react';

import Link from 'next/link';

import { Options } from './Options';
import SearchBarParent from './SearchBarParent';


export const Header: React.FC = () => (
  <header className="fixed bg-background border-b px-6 py-4 flex items-center justify-between z-50 w-full h-16">
    <div className="flex items-center gap-4">
      <Link href="#" className="text-xl lg:text-2xl font-bold mr-2" prefetch={false}>
        Workout Tracker
      </Link>
      <nav className="hidden md:flex items-center gap-4 justify-center">
        {['Dashboard', 'Workouts', 'Exercises', 'Log Workout', 'Calendar', 'Goals'].map((item) => (
          <Link
            key={item}
            href={`#${item}`}
            className="text-muted-foreground hover:text-primary text-sm lg:text-lg"
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

