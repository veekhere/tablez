import { ObjectUtils } from '@utils/object.utils';
import { BaseModel } from './base.model';

export class ContainerBounds extends BaseModel {

  top: number = null;

  left: number = null;

  width: number = null;

  height: number = null;

  constructor(entity: Partial<ContainerBounds> = null) {
    super(entity);
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
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
