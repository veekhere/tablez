import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  className?: string;
  listLength: number;
  columnEditorMode: boolean;
  onAddColumn: () => void;
  onSpecifyColumns: () => void;
  onClear: () => void;
};

export function ColumnListFooter({ className, listLength, columnEditorMode, onAddColumn, onSpecifyColumns, onClear }: Props) {
  const [clearAlert, setClearAlert] = useState(false);

  return (
    <div
      className={cn(
        'flex mt-4 -ml-4 w-[614px]',
        className,
        listLength > 0 && 'ml-8 w-[calc(100%-2rem)]',
        listLength >= 10 && 'flex-col justify-center items-center',
      )}
    >
      {listLength < 10 && (
        <Button
          className='mr-4 w-[340px] last:w-full last:mr-0'
          variant='ghost'
          size='icon'
          onClick={onAddColumn}
          disabled={columnEditorMode}
        >
          <PlusIcon className='w-6 h-6' />
          <div className='ml-2'>Add column</div>
        </Button>
      )}

      {listLength > 0 && (
        <AlertDialog
          open={clearAlert}
          onOpenChange={setClearAlert}
        >
          <AlertDialogTrigger asChild>
            <Button
              className='w-full last:max-w-[210px]'
              variant='ghost'
              size='icon'
              disabled={columnEditorMode}
            >
              <TrashIcon className='w-4 h-4 text-red-500 opacity-80' />
              <div className='ml-2 text-red-500 opacity-80'>Clear columns</div>
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className='select-none'>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear columns</AlertDialogTitle>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button
                variant='ghost'
                onClick={() => setClearAlert(false)}
              >
                Cancel
              </Button>

              <Button
                variant='outline'
                onClick={() => {
                  setClearAlert(false);
                  onSpecifyColumns?.();
                }}
              >
                Specify columns
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>All columns</Button>
                </AlertDialogTrigger>

                <AlertDialogContent className='select-none'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                      onClick={() => {
                        setClearAlert(false);
                        onClear?.();
                      }}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {listLength >= 10 && (
        <div>
          {columnEditorMode ? (
            <p className='w-fit text-xs mt-2 text-muted-foreground-extra select-none'>You can add up to 10 columns</p>
          ) : (
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <p className='w-fit text-xs mt-2 text-muted-foreground-extra cursor-help select-none'>You can add up to 10 columns</p>
                </TooltipTrigger>

                <TooltipContent
                  align='center'
                  side='top'
                >
                  <span>This value may be extended in the future versions</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </div>
  );
}
