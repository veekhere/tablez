import { useAppSelector } from '@/store/hooks';
import { getLoader } from '@store/slices/loader.slice';
import { createPortal } from 'react-dom';

enum LoaderState {
  Active = 'active',
  Closed = 'closed',
}

export function Loader() {
  const loader = useAppSelector(getLoader);

  return createPortal(
    <div
      className='h-full w-full fixed inset-0 z-[100] select-none bg-black/80 transition-opacity data-[state=active]:opacity-100 data-[state=active]:pointer-events-auto data-[state=closed]:opacity-0 data-[state=closed]:pointer-events-none'
      data-state={loader ? LoaderState.Active : LoaderState.Closed}
    >
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <div className='grid gap-1 grid-flow-col'>
          <span className='text-2xl font-thin lg:text-4xl animate-scale-pulse'>{'{'}</span>
          <div className='relative w-8 before:block before:absolute before:w-2 before:h-2 before:top-1/2 before:left-0 before:bg-foreground before:rounded-full before:animate-sidechange'></div>
          <span className='text-2xl font-thin lg:text-4xl animate-scale-pulse direction-alternate-reverse'>{'}'}</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
