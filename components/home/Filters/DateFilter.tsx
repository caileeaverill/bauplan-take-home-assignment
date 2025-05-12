// "use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DateFilterProps {
    onDateSelect: (dateRange: { startDate: Date | null; endDate: Date | null }) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onDateSelect }) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: addDays(new Date(), -7),
        to: new Date(),
    });

    const handleDateChange = (selectedDate: DateRange | undefined) => {
        setDate(selectedDate);
        if (selectedDate) {
            onDateSelect({ startDate: selectedDate.from || null, endDate: selectedDate.to || null });
        } else {
            onDateSelect({ startDate: null, endDate: null });
        }
    };

    return (
        <div className={cn("grid gap-2")}>
            <div className="text-zinc-400 text-xs font-medium mb-1">Filter by date</div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal text-sm text-gray-700",
                            !date && "text-muted-foreground"
                        )}
                    >
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 " align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DateFilter;