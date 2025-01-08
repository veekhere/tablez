import * as React from 'react';

import { cn } from '@/lib/utils';
import { CircleXIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  if (props?.error) {
    className = className?.concat(' pr-10 ');
  }

  return (
    <div className='relative'>
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-[inherit]',
          className,
        )}
        ref={ref}
        {...props}
      />

      {props?.error && (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className='absolute top-1/2 -translate-y-1/2 right-0 p-3 hover:cursor-pointer'>
                <CircleXIcon className=' h-4 w-4 text-red-500 opacity-80'></CircleXIcon>
              </div>
            </TooltipTrigger>

            <TooltipContent>
              <p className='select-none'>{props.error}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
