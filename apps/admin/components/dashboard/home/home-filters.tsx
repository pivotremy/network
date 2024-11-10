'use client';

import * as React from 'react';
import { isSameDay, subDays } from 'date-fns';
import { useQueryStates } from 'nuqs';
import { DateRange } from 'react-day-picker';

import { searchParams } from '@/components/dashboard/home/home-search-params';
import { DateRangePicker } from '@/components/ui/date-picker';
import {
  UnderlinedTabs,
  UnderlinedTabsList,
  UnderlinedTabsTrigger
} from '@/components/ui/tabs';
import { useTransitionContext } from '@/hooks/use-transition-context';

enum Preset {
  OneDay = '1d',
  ThreeDays = '3d',
  SevenDays = '7d',
  ThirtyDays = '30d',
  Custom = 'Custom'
}

const derivePresetFromDateRange = (range?: DateRange): string => {
  if (!range || !range.from || !range.to) {
    return Preset.Custom;
  }

  const today = new Date();
  if (!isSameDay(today, range.to)) {
    return Preset.Custom;
  }

  if (isSameDay(range.from, subDays(today, 1))) {
    return Preset.OneDay;
  } else if (isSameDay(range.from, subDays(today, 3))) {
    return Preset.ThreeDays;
  } else if (isSameDay(range.from, subDays(today, 7))) {
    return Preset.SevenDays;
  } else if (isSameDay(range.from, subDays(today, 30))) {
    return Preset.ThirtyDays;
  }

  return Preset.Custom;
};

export function HomeFilters(): React.JSX.Element {
  const { startTransition } = useTransitionContext();
  const [dateRange, setDateRange] = useQueryStates(
    {
      from: searchParams.from,
      to: searchParams.to
    },
    {
      history: 'replace',
      startTransition,
      shallow: false
    }
  );
  const [preset, setPreset] = React.useState<string>(
    derivePresetFromDateRange(dateRange)
  );

  const handleValueChange = (value: string): void => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      return;
    }

    const today = new Date();
    if (value === Preset.OneDay) {
      setDateRange({
        from: subDays(today, 1),
        to: today
      });
    }
    if (value === Preset.ThreeDays) {
      setDateRange({
        from: subDays(today, 3),
        to: today
      });
    }
    if (value === Preset.SevenDays) {
      setDateRange({
        from: subDays(today, 7),
        to: today
      });
    }
    if (value === Preset.ThirtyDays) {
      setDateRange({
        from: subDays(today, 30),
        to: today
      });
    }

    setPreset(value);
  };

  const handleDateRangeChange = (range?: DateRange): void => {
    let value = range;
    if (!value) {
      const now = new Date();
      value = { from: now, to: now };
    }
    if (!value.from) value.from = value.to;
    if (!value.to) value.to = value.from;

    setPreset(derivePresetFromDateRange(range));
    setDateRange(range ?? {});
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <UnderlinedTabs
        value={preset}
        onValueChange={handleValueChange}
        className="hidden sm:flex"
      >
        <UnderlinedTabsList className="h-12 max-h-12 min-h-12 gap-x-2 border-none">
          {Object.values(Preset).map((value) => (
            <UnderlinedTabsTrigger
              key={value}
              value={value}
              className="mx-0 border-t-4 border-t-transparent"
            >
              <div className="rounded-md px-2 py-1 hover:bg-accent">
                {value}
              </div>
            </UnderlinedTabsTrigger>
          ))}
        </UnderlinedTabsList>
      </UnderlinedTabs>
      <DateRangePicker
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />
    </div>
  );
}
