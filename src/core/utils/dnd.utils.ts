import { PlaceholderData } from '@components/ui/dnd-placeholder';
import { DraggableStateSnapshot, DraggableStyle } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';

export class DnDUtils {

  static readonly DRAG_HANDLE_ATTR = 'data-rfd-drag-handle-draggable-id';

  static get droppableId(): string {
    return uuidv4();
  }

  static getStyle(style: DraggableStyle, snapshot: DraggableStateSnapshot): any {
    if (!snapshot.isDropAnimating) {
      return style;
    }

    return {
      ...style,
      transition: 'all 0.15s ease',
    };
  }

  static calculatePlaceholderPosition(draggableId: string, startIndex: number): PlaceholderData {
    const domQuery = `[${this.DRAG_HANDLE_ATTR}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const clientX = parseFloat(window.getComputedStyle(draggedDOM.parentElement).paddingLeft);
    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentElement).paddingTop) +
      [...draggedDOM.parentElement.children].slice(0, startIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);

        return total + curr.clientHeight + marginBottom;
      }, 0);

    return {
      clientX,
      clientY,
      clientHeight,
      clientWidth,
    };
  }
}
