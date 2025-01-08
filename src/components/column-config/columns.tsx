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
import { DnDPlaceholder, PlaceholderData } from '@components/ui/dnd-placeholder';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';
import { useEditorOverlay } from '@context/editor-overlay.context';
import { ColumnDescriptor } from '@domain/column-descriptor.model';
import { DragDropContext, DragStart, DragUpdate, Droppable, DropResult } from '@hello-pangea/dnd';
import { useAppDispatch } from '@store/hooks';
import { DnDUtils } from '@utils/dnd.utils';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EditorOverlay } from '../editor-overlay';
import { Button } from '../ui/button';
import { ColumnConfig } from './column-config';
import { ColumnConfigService } from './services/column-config.service';

type Props = {
  className?: string;
  descriptors: ColumnDescriptor[];
};

export function Columns(props: Props) {
  const droppableId = useMemo(() => DnDUtils.droppableId, []);

  const { isActive: columnEditorMode, setIsActive: setColumnEditorMode } = useEditorOverlay();

  const [clearAlert, setClearAlert] = useState(false);
  const [placeholderData, setPlaceholderData] = useState<PlaceholderData>(null);
  const [selectedDescriptors, setSelectedDescriptors] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const columnConfigService = new ColumnConfigService(dispatch, props?.descriptors);

  function onDragStart(start: DragStart): void {
    setPlaceholderData(DnDUtils.calculatePlaceholderPosition(start?.draggableId, start?.source?.index));
  }

  function onDragUpdate(update: DragUpdate): void {
    setPlaceholderData(null);

    if (!update.destination) {
      return;
    }

    setPlaceholderData(DnDUtils.calculatePlaceholderPosition(update?.draggableId, update?.destination?.index));
  }

  function onDragEnd(result: DropResult): void {
    setPlaceholderData(null);

    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    columnConfigService.moveDescriptor(draggableId, source.index, destination.index);
  }

  function onSelect(id: string): void {
    setSelectedDescriptors([...selectedDescriptors, id]);
  }

  function onUnselect(id: string): void {
    setSelectedDescriptors(selectedDescriptors.filter((d) => d !== id));
  }

  function confirmColumnsDelete(): void {
    columnConfigService.deleteDescriptors(selectedDescriptors);
    setSelectedDescriptors([]);
  }

  function onClear(): void {
    columnConfigService.clearDescriptors();
    setClearAlert(false);
  }

  return (
    <div className={cn('relative', props?.className)}>
      <EditorOverlay
        verifyConfirm
        confirm={confirmColumnsDelete}
        deactivate={() => setSelectedDescriptors([])}
        confirmDisabled={selectedDescriptors.length === 0}
      >
        <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='relative w-fit'
              >
                {props?.descriptors?.map((descriptor, index) => (
                  <ColumnConfig
                    key={descriptor?.id}
                    descriptorId={descriptor?.id}
                    index={index}
                    columnEditorMode={columnEditorMode}
                    onSelect={onSelect}
                    onUnselect={onUnselect}
                  />
                ))}

                <DnDPlaceholder
                  placeholder={provided?.placeholder}
                  isDraggingOver={snapshot?.isDraggingOver}
                  placeholderData={placeholderData}
                  clientHeightOffset={8}
                  clientWidthOffset={-60}
                  clientXOffset={4}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div
          className={cn(
            'flex space-x-4 mt-4 ml-7 mr-[56px] w-[566px]',
            props?.descriptors?.length >= 10 && 'flex-col justify-center items-center',
          )}
        >
          {props?.descriptors?.length < 10 && (
            <Button
              className='w-[340px] last:w-full'
              variant='ghost'
              size='icon'
              onClick={() => columnConfigService.addDescriptor()}
              disabled={columnEditorMode}
            >
              <PlusIcon className='w-6 h-6' />
              <div className='ml-2'>Add column</div>
            </Button>
          )}

          {props?.descriptors?.length > 0 && (
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
                    className=''
                    variant='ghost'
                    onClick={() => setClearAlert(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    className=''
                    variant='outline'
                    onClick={() => {
                      setClearAlert(false);
                      setColumnEditorMode(true);
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
                        <AlertDialogAction onClick={onClear}>Confirm</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {props?.descriptors?.length >= 10 && (
            <div>
              <TooltipProvider>
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
            </div>
          )}
        </div>
      </EditorOverlay>
    </div>
  );
}
