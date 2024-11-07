'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DisplayArchiveItem } from '@/lib/archive';

export type FilterProps = {
  keywords: string[];
  onChange: (value: string) => void;
};

export function handleFilter(
  filter: string,
  displayArchive: DisplayArchiveItem[]
) {
  if (filter === '') {
    return displayArchive;
  } else {
    return displayArchive.filter((item) => item.keywords.includes(filter));
  }
}

export function Filter({ keywords, onChange }: FilterProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? keywords.find((keyword) => keyword === value)
            : 'Search by keyword'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search by keyword" />
          <CommandList>
            <CommandEmpty>No keywords found</CommandEmpty>
            <CommandGroup>
              {keywords.map((keyword) => (
                <CommandItem
                  key={keyword}
                  value={keyword}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    onChange(currentValue === value ? '' : currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === keyword ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {keyword}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
