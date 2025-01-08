import { cn } from '@/lib/utils';
import { Button } from '@components/ui/button';
import { useEditorOverlay } from '@context/editor-overlay.context';
import { ContainerBounds } from '@domain/container-bounds.model';
import { OverlayState } from '@domain/enums/overlay-state.enum';
import { PropsWithChildren, useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

type Props = PropsWithChildren<{
  className?: string;
  verifyConfirm?: boolean;
  confirmDisabled?: boolean;
  deactivate?: () => void;
  confirm?: () => void;
}>;

type ContainerState = {
  container: ContainerBounds;
  buttonsContainer: ContainerBounds;
};

enum ActionTypes {
  SetContainers = 'setContainers',
  Reset = 'reset',
}

type ContainerStateAction = {
  type: ActionTypes;
  container: ContainerBounds;
  buttonsContainer: ContainerBounds;
};

function reducer(state: ContainerState, action: ContainerStateAction): ContainerState {
  switch (action.type) {
    case ActionTypes.SetContainers:
      return {
        container: action.container,
        buttonsContainer: action.buttonsContainer,
      };

    case ActionTypes.Reset:
      return {
        container: null,
        buttonsContainer: null,
      };

    default:
      return state;
  }
}

function getContainerBounds(element: HTMLElement, saved: ContainerBounds): ContainerBounds {
  const boundingRect = element?.getBoundingClientRect();
  return ContainerBounds.toClientObject({
    ...saved,
    top: boundingRect?.top,
    left: boundingRect?.left,
    width: boundingRect?.width,
    height: boundingRect?.height,
  });
}

const containerId = uuidv4();
const buttonsContainerId = uuidv4();

export function EditorOverlay(props: Props) {
  const { isActive, setIsActive, hasAllowedContainer, addAllowedContainer, updateAllowedContainer, removeAllowedContainer } =
    useEditorOverlay();

  const [containers, dispatchContainers] = useReducer(reducer, {
    container: new ContainerBounds({ id: containerId }),
    buttonsContainer: new ContainerBounds({ id: buttonsContainerId }),
  });

  const hasContainer = hasAllowedContainer(containerId);
  const hasButtonsContainer = hasAllowedContainer(buttonsContainerId);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [verifyOpen, setVerifyOpen] = useState(false);

  useEffect(() => {
    if (containerRef.current || buttonsRef.current) {
      dispatchContainers({
        type: ActionTypes.SetContainers,
        container: getContainerBounds(containerRef.current, containers.container),
        buttonsContainer: getContainerBounds(buttonsRef.current, containers.buttonsContainer),
      });
    }
  }, [props?.children, containerRef, buttonsRef]);

  useEffect(() => {
    if (isActive) {
      if (hasContainer) {
        updateAllowedContainer(containers.container);
      } else {
        addAllowedContainer(containers.container);
      }

      if (hasButtonsContainer) {
        updateAllowedContainer(containers.buttonsContainer);
      } else {
        addAllowedContainer(containers.buttonsContainer);
      }
    } else {
      if (hasContainer) {
        removeAllowedContainer(containers.container.id);
      }

      if (hasButtonsContainer) {
        removeAllowedContainer(containers.buttonsContainer.id);
      }
    }
  }, [isActive, containers, hasContainer, hasButtonsContainer]);

  const escHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    },
    [isActive],
  );

  const enterHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (props?.verifyConfirm) {
          setTimeout(() => {
            setVerifyOpen(true);
          }, 100);
        } else {
          onConfirmVerified();
        }
      }
    },
    [isActive],
  );

  useLayoutEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', escHandler);
    }

    if (isActive && !verifyOpen) {
      document.addEventListener('keydown', enterHandler);
    }

    return () => {
      document.removeEventListener('keydown', escHandler);
      document.removeEventListener('keydown', enterHandler);
    };
  }, [isActive, verifyOpen, escHandler, enterHandler]);

  function onCancel(): void {
    setIsActive(false);
    props?.deactivate?.();
  }

  function onConfirmVerified(): void {
    setIsActive(false);
    props?.confirm?.();
  }

  return (
    <div
      className={cn(
        'group/overlay box-border relative z-[1] w-full h-full bg-background border-2 border-dashed rounded-md p-[14px] data-[state=active]:border-white/50 data-[state=closed]:border-transparent select-none transition-editor',
        props?.className,
      )}
      data-state={isActive ? OverlayState.Active : OverlayState.Closed}
      ref={containerRef}
    >
      {props?.children}

      <div className='absolute w-full pl-4 flex justify-between -bottom-12 left-0 group-data-[state=active]/overlay:opacity-100 group-data-[state=active]/overlay:pointer-events-auto group-data-[state=closed]/overlay:opacity-0 group-data-[state=closed]/overlay:pointer-events-none transition-editor'>
        <p className='flex text-xs text-muted-foreground-extra'>
          Press <span className='mx-1 font-mono italic'>ESC</span> to exit selection mode
        </p>

        <div
          className='space-x-2'
          ref={buttonsRef}
        >
          <Button
            variant='ghost'
            onClick={onCancel}
          >
            Cancel
          </Button>

          {props?.verifyConfirm ? (
            <AlertDialog
              open={verifyOpen}
              onOpenChange={setVerifyOpen}
            >
              <AlertDialogTrigger asChild>
                <Button disabled={props?.confirmDisabled}>Confirm</Button>
              </AlertDialogTrigger>

              <AlertDialogContent className='select-none'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onConfirmVerified}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button
              disabled={props?.confirmDisabled}
              onClick={onConfirmVerified}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
