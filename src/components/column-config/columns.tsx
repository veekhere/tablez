import { cn } from '@/lib/utils';
import { DnDPlaceholder, PlaceholderData } from '@components/ui/dnd-placeholder';
import { useEditorOverlay } from '@context/editor-overlay.context';
import { ColumnDescriptor } from '@domain/column-descriptor.model';
import { DragDropContext, DragStart, DragUpdate, Droppable, DropResult } from '@hello-pangea/dnd';
import { useAppDispatch } from '@store/hooks';
import { DnDUtils } from '@utils/dnd.utils';
import { useMemo, useState } from 'react';
import { EditorOverlay } from '../editor-overlay';
import { ColumnConfig } from './column-config';
import { ColumnListFooter } from './column-list-footer';
import { ColumnConfigService } from './services/column-config.service';

type Props = {
  className?: string;
  descriptors: ColumnDescriptor[];
};

export function Columns(props: Props) {
  const droppableId = useMemo(() => DnDUtils.droppableId, []);

  const { isActive: columnEditorMode, setIsActive: setColumnEditorMode } = useEditorOverlay();

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

  function onAddColumn(): void {
    columnConfigService.addDescriptor();
  }

  function onSpecifyColumns(): void {
    setColumnEditorMode(true);
  }

  function onClear(): void {
    columnConfigService.clearDescriptors();
  }

  return (
    <div className={cn('relative w-fit', props?.className)}>
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
                  clientWidthOffset={16}
                  clientXOffset={-16}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <ColumnListFooter
          className={cn('transition', columnEditorMode ? 'opacity-0 pointer-events-none translate-y-10 max-h-0' : 'opacity-100')}
          listLength={props?.descriptors?.length}
          columnEditorMode={columnEditorMode}
          onAddColumn={onAddColumn}
          onSpecifyColumns={onSpecifyColumns}
          onClear={onClear}
        />
      </EditorOverlay>
    </div>
  );
}
