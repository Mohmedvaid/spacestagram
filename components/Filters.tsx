"use client";

import { Sliders } from "lucide-react";
import { MIN_YEAR, getMaxYear } from "@/lib/constants";

interface FiltersProps {
  startYear: string;
  endYear: string;
  onStartYearChange: (year: string) => void;
  onEndYearChange: (year: string) => void;
  onReset: () => void;
}

export function Filters({
  startYear,
  endYear,
  onStartYearChange,
  onEndYearChange,
  onReset,
}: FiltersProps) {
  const maxYear = getMaxYear();
  const hasFilters = startYear || endYear;

  // Convert year strings to date strings for date picker
  const startDate = startYear ? `${startYear}-01-01` : "";
  const endDate = endYear ? `${endYear}-12-31` : "";

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      const year = new Date(date).getFullYear().toString();
      onStartYearChange(year);
    } else {
      onStartYearChange("");
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      const year = new Date(date).getFullYear().toString();
      onEndYearChange(year);
    } else {
      onEndYearChange("");
    }
  };

  return (
    <div className="sticky top-[73px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:border-slate-700 dark:bg-slate-800/95 dark:supports-[backdrop-filter]:dark:bg-slate-800/75">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Sliders className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="startDate" className="text-sm text-slate-600 dark:text-slate-400">
              From:
            </label>
            <input
              id="startDate"
              type="date"
              min={`${MIN_YEAR}-01-01`}
              max={`${maxYear}-12-31`}
              value={startDate}
              onChange={handleStartDateChange}
              className="w-40 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="endDate" className="text-sm text-slate-600 dark:text-slate-400">
              To:
            </label>
            <input
              id="endDate"
              type="date"
              min={`${MIN_YEAR}-01-01`}
              max={`${maxYear}-12-31`}
              value={endDate}
              onChange={handleEndDateChange}
              className="w-40 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {hasFilters && (
            <button
              onClick={onReset}
              className="ml-auto rounded-md border border-slate-300 bg-white px-4 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

