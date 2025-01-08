import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { SelectOption } from '@domain/select-option';
import { useState } from 'react';

type Props = {
  id?: string;
  title?: string;
  className?: string;
  options: SelectOption[];
  disabled?: boolean;
  onChange?: (value: any) => any;
};

export function Combobox(props: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption>(props?.options?.[0] || null);

  return (
    <div className='flex items-center space-x-4'>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='default'
            className={'min-w-[150px] max-w-fit justify-start ' + props?.className}
            disabled={props?.disabled}
          >
            {selected ? (
              <>
                <selected.icon className='mr-2 h-4 w-4 shrink-0' />
                {selected.label}
              </>
            ) : (
              <>+ Set {props?.title?.toLowerCase() ?? 'option'}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='p-0'
          side='right'
          align='start'
        >
          <Command>
            <CommandList>
              <CommandGroup>
                {props?.options?.map((option) => (
                  <CommandItem
                    className='cursor-pointer'
                    key={option.value}
                    value={option.value}
                    onSelect={(value) => {
                      setSelected(props?.options?.find((o) => o.value === value) || null);
                      setOpen(false);
                      props?.onChange?.(value);
                    }}
                  >
                    <option.icon className={cn('mr-2 h-4 w-4', option.value === selected?.value ? 'opacity-100' : 'opacity-40')} />
                    <span>{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
