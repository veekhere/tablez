import { ReactNode } from 'react';

export type PlaceholderData = {
  clientX: number;
  clientY: number;
  clientHeight: number;
  clientWidth: number;
};

type Props = {
  placeholder: ReactNode;
  placeholderData: PlaceholderData;
  isDraggingOver: boolean;
  clientXOffset?: number;
  clientYOffset?: number;
  clientHeightOffset?: number;
  clientWidthOffset?: number;
};

export function DnDPlaceholder(props: Props) {
  function getField(field: keyof PlaceholderData): number {
    type offsetType = keyof Omit<Props, 'placeholder' | 'isDraggingOver' | 'placeholderData'>;
    return props?.placeholderData ? props?.placeholderData[field] + (props?.[`${field}Offset` as offsetType] ?? 0) : null;
  }

  return (
    <>
      {props?.placeholder}
      <div
        className='border-2 border-dashed rounded-lg transition-all'
        style={{
          display: props?.isDraggingOver ? 'block' : 'none',
          position: 'absolute',
          top: getField('clientY'),
          left: getField('clientX'),
          height: getField('clientHeight'),
          width: getField('clientWidth'),
        }}
      />
    </>
  );
}
