import React, { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { MonthPicker } from "./monthpicker";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DateRangePickerProps {
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
}: DateRangePickerProps) {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  // Convert string dates to Date objects for MonthPicker
  const startDateObj = startDate ? new Date(startDate) : undefined;
  const endDateObj = endDate ? new Date(endDate) : undefined;

  // Handle month selection
  const handleStartMonthSelect = (date: Date) => {
    const startDateChange = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).toISOString();
    onStartDateChange(startDateChange);
    setStartOpen(false);
  };

  const handleEndMonthSelect = (date: Date) => {
    const endDateChange = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).toISOString();
    onEndDateChange(endDateChange);
    setEndOpen(false);
  };

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-0'>
        <div className='flex-1 sm:mr-2'>
          <Label className='font-base mb-2 block text-sm'>Start Date</Label>
          <Popover open={startOpen} onOpenChange={setStartOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDateObj && ""
                )}
              >
                <div className='flex w-full items-center'>
                  <CalendarIcon className='mr-2 size-4' />
                  <span className='flex-1'>
                    {startDateObj
                      ? format(startDateObj, "MMM yyyy")
                      : "Pick a start month"}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='bg-secondary w-auto p-0'>
              <MonthPicker
                selectedMonth={startDateObj}
                onMonthSelect={handleStartMonthSelect}
                maxDate={endDateObj}
                variant={{
                  calendar: {
                    main: "default",
                    selected: "neutral",
                  },
                  chevrons: "default",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex-1 sm:ml-2'>
          <Label className='font-base mb-2 block text-sm'>End Date</Label>
          <Popover open={endOpen} onOpenChange={setEndOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDateObj && ""
                )}
              >
                <div className='flex w-full items-center'>
                  <CalendarIcon className='mr-2 size-4' />
                  <span className='flex-1'>
                    {endDateObj
                      ? format(endDateObj, "MMM yyyy")
                      : "Pick an end month"}
                  </span>
                  {endDateObj && (
                    <div
                      role='button'
                      className='hover:bg-hover rounded-base flex size-4 cursor-pointer items-center justify-center p-0'
                      onClick={(e) => {
                        e.stopPropagation();
                        onEndDateChange("");
                      }}
                    >
                      <X className='size-3' />
                    </div>
                  )}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <MonthPicker
                selectedMonth={endDateObj}
                onMonthSelect={handleEndMonthSelect}
                minDate={startDateObj}
                variant={{
                  calendar: {
                    main: "default",
                    selected: "neutral",
                  },
                  chevrons: "default",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
