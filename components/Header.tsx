"use client";

import { ThemeToggle } from "./ThemeToggle";

/**
 * Props for the Header component
 */
interface HeaderProps {
  /** Callback function when search is triggered (currently unused) */
  onSearch: (query: string) => void;
  /** Initial search query (currently unused) */
  initialQuery?: string;
  /** Whether to show search in header (currently unused) */
  showSearch?: boolean;
}

/**
 * Header component displays the app logo and theme toggle
 * Sticky header that stays at the top while scrolling
 * 
 * @param props - Component props
 * @returns Header component with logo and theme toggle
 */
export function Header({ onSearch, initialQuery = "", showSearch = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:border-slate-700 dark:bg-slate-800/95 dark:supports-[backdrop-filter]:dark:bg-slate-800/75 overflow-visible">
      <div className="container mx-auto px-4 py-4 overflow-visible">
        <div className="flex items-center justify-between overflow-visible">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group overflow-visible">
            <h1 className="text-2xl sm:text-3xl font-logo leading-tight select-none lowercase overflow-visible">
              <span className="inline-block bg-gradient-to-r from-purple-600 via-indigo-500 via-purple-500 to-purple-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-indigo-300 dark:via-purple-300 dark:to-purple-400">
                space
              </span>
              <span className="inline-block ml-1 bg-gradient-to-r from-indigo-600 via-purple-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:via-indigo-300 dark:to-indigo-400 overflow-visible">
                stagram
              </span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
