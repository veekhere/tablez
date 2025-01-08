import { useEditorOverlay } from '@context/editor-overlay.context';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

type MouseData = {
  clientX: number;
  clientY: number;
};

type Props = PropsWithChildren<{}>;

function toggle(element: HTMLDivElement, enable: boolean): void {
  element.style.pointerEvents = enable ? 'auto' : 'none';
  element.parentElement.style.cursor = enable ? 'auto' : 'not-allowed';
}

export function FocusContainer({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouseData, setMouseData] = useState<MouseData>(null);

  const { allowedContainers, isAllowed } = useEditorOverlay();

  function onMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const clientX = e.clientX;
    const clientY = e.clientY;
    setMouseData({ clientX, clientY });

    const allowed = isAllowed(clientX, clientY);
    toggle(ref.current, allowed);
  }

  useEffect(() => {
    if (allowedContainers.length === 0) {
      toggle(ref.current, true);
    } else {
      toggle(ref.current, isAllowed(mouseData.clientX, mouseData.clientY));
    }
  }, [allowedContainers]);

  return (
    <div
      className='focus-handler'
      onMouseMove={onMouseMove}
    >
      <div
        ref={ref}
        className='focus-container'
      >
        {children}
      </div>
    </div>
  );
}
