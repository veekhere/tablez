import { cn } from '@/lib/utils';
import { ColumnType, ColumnTypeEnum } from '@domain/enums/column-type.enum';
import { Draggable } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getColumnDescriptorById, getColumnDescriptors } from '@store/slices/column-descriptors.slice';
import { DnDUtils } from '@utils/dnd.utils';
import { GripVerticalIcon, Trash2Icon } from 'lucide-react';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import { useEffect, useState } from 'react';
import { Combobox } from '../combobox';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ColumnConfigService } from './services/column-config.service';

type Props = {
  className?: string;
  descriptorId: string;
  index: number;
  disabled?: boolean;
  isDragDisabled?: boolean;
  columnEditorMode?: boolean;
  onSelect?: (id: string) => void;
  onUnselect?: (id: string) => void;
};

export function ColumnConfig(props: Props) {
  const [titleError, setTitleError] = useState<string>(null);
  const [selected, setSelected] = useState(false);

  const descriptor = useAppSelector((state) => getColumnDescriptorById(state, props?.descriptorId));
  const descriptors = useAppSelector((state) => getColumnDescriptors(state));
  const dispatch = useAppDispatch();

  const columnConfigService = new ColumnConfigService(dispatch, descriptors);

  function onSelect(): void {
    if (!props?.columnEditorMode) {
      return;
    }

    if (selected) {
      setSelected(false);
      props?.onUnselect?.(props?.descriptorId);
    } else {
      setSelected(true);
      props?.onSelect?.(props?.descriptorId);
    }
  }

  useEffect(() => {
    if (!props?.columnEditorMode) {
      setSelected(false);
    }
  }, [props?.columnEditorMode]);

  return (
    <Draggable
      draggableId={props?.descriptorId}
      index={props?.index}
      isDragDisabled={props?.isDragDisabled || props?.columnEditorMode}
    >
      {(provided, snapshot) => (
        <NaturalDragAnimation
          style={DnDUtils.getStyle(provided.draggableProps.style, snapshot)}
          snapshot={snapshot}
        >
          {(style) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={cn(
                'relative group/descriptor w-fit show-on-hover transition-opacity mb-2',
                props?.className,
                snapshot?.isDragging && 'opacity-50',
              )}
              data-selected={selected}
              style={style}
              onClick={onSelect}
            >
              <div className='flex transition-opacity items-end group-data-[state=closed]/overlay:opacity-100 group-data-[state=active]/overlay:group-data-[selected=true]/descriptor:opacity-20 group-data-[state=active]/overlay:group-data-[selected=false]/descriptor:opacity-100'>
                <GripVerticalIcon className='mr-1 h-10 opacity-10' />

                <div>
                  <Label
                    htmlFor='title'
                    className='select-none'
                  >
                    Title
                  </Label>

                  <Input
                    id='title'
                    type='text'
                    placeholder='Column title'
                    minLength={1}
                    maxLength={40}
                    className='w-[340px]'
                    error={titleError}
                    disabled={props?.disabled || props?.columnEditorMode}
                    onChange={(e) => columnConfigService.setColumnName(e.target.value, descriptor, setTitleError)}
                  />
                </div>

                <div className='mx-4'>
                  <Label
                    htmlFor='type'
                    className='select-none'
                  >
                    Type
                  </Label>

                  <Combobox
                    id='type'
                    className='w-[210px] max-w-none'
                    options={ColumnType.selectOptions()}
                    disabled={props?.disabled || props?.columnEditorMode}
                    onChange={(value: ColumnTypeEnum) => columnConfigService.setColumnType(value, descriptor)}
                  />
                </div>

                {!!descriptor && !snapshot?.isDragging && !props?.disabled && !props?.columnEditorMode && (
                  <Button
                    className='show'
                    variant='outline'
                    size='icon'
                    onClick={() => columnConfigService.deleteDescriptors([descriptor?.id])}
                  >
                    <Trash2Icon className='w-4 h-4 text-red-500 opacity-80' />
                  </Button>
                )}
              </div>

              {props?.columnEditorMode && (
                <div className='transition opacity-0 pointer-events-none group-hover/descriptor:opacity-100 group-hover/descriptor:pointer-events-auto group-hover/descriptor:cursor-pointer absolute w-[calc(100%-1rem)] h-full top-0 left-0 z-10 bg-background/50 backdrop-blur-[2px] rounded-md border border-white/10'>
                  <span
                    className={cn(
                      'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200',
                      !selected ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    Select column
                  </span>
                  <span
                    className={cn(
                      'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200',
                      selected ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    Unselect column
                  </span>
                </div>
              )}
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  );
}
