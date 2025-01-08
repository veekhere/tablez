import { ObjectUtils } from '@utils/object.utils';
import { v4 as uuidv4 } from 'uuid';

export class ContainerBounds {

  id = uuidv4();

  top: number = null;

  left: number = null;

  width: number = null;

  height: number = null;

  constructor(entity: Partial<ContainerBounds> = null) {
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
    this.id = entity.id ?? uuidv4();
  }

  static toClientObject(obj: any): ContainerBounds {
    if (!obj) {
      return null;
    }
    return new ContainerBounds(obj);
  }

  isAllowed(clientX: number, clientY: number): boolean {
    return this.top <= clientY
      && this.left <= clientX
      && (this.top + this.height) >= clientY
      && (this.left + this.width) >= clientX;
  }
}
