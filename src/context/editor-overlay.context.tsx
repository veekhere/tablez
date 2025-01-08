import { ContainerBounds } from '@domain/container-bounds.model';
import { isEqual } from 'lodash';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type EditorOverlayContext = {
  isActive: boolean;
  allowedContainers: ContainerBounds[];
  setIsActive: (isActive: boolean) => void;
  isAllowed: (clientX: number, clientY: number) => boolean;
  hasAllowedContainer: (containerId: string) => boolean;
  addAllowedContainer: (container: ContainerBounds) => void;
  updateAllowedContainer: (container: ContainerBounds) => void;
  removeAllowedContainer: (containerId: string) => void;
};

const EditorOverlayContext = createContext<EditorOverlayContext>(null);

function compareContainers(a: ContainerBounds, b: ContainerBounds): boolean {
  return isEqual(a, b);
}

export function useEditorOverlay(): EditorOverlayContext {
  return useContext<EditorOverlayContext>(EditorOverlayContext);
}

export function EditorOverlayProvider({ children }: PropsWithChildren) {
  const [isActive, setIsActive] = useState(false);
  const [allowedContainers, setAllowedContainers] = useState<ContainerBounds[]>([]);

  function isAllowed(clientX: number, clientY: number): boolean {
    return allowedContainers.length === 0 || allowedContainers.find((allowed) => allowed?.isAllowed(clientX, clientY)) !== undefined;
  }

  function hasAllowedContainer(containerId: string): boolean {
    return allowedContainers.some((container) => container.id === containerId);
  }

  function addAllowedContainer(container: ContainerBounds): void {
    const index = allowedContainers.findIndex((o) => o.id === container.id);

    if (index === -1) {
      setAllowedContainers([...allowedContainers, container]);
    } else {
      updateAllowedContainer(container);
    }
  }

  function updateAllowedContainer(container: ContainerBounds): void {
    const index = allowedContainers.findIndex((o) => o.id === container.id);

    if (index !== -1) {
      if (!compareContainers(allowedContainers[index], container)) {
        setAllowedContainers([...allowedContainers.slice(0, index), container, ...allowedContainers.slice(index + 1)]);
      } else {
        return;
      }
    }
  }

  function removeAllowedContainer(containerId: string): void {
    setAllowedContainers(allowedContainers.filter((container) => container?.id !== containerId));
  }

  const value: EditorOverlayContext = {
    isActive,
    allowedContainers,
    setIsActive,
    isAllowed,
    hasAllowedContainer,
    addAllowedContainer,
    updateAllowedContainer,
    removeAllowedContainer,
  };

  return <EditorOverlayContext.Provider value={value}>{children}</EditorOverlayContext.Provider>;
}
