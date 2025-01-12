import { ObjectUtils } from '@utils/object.utils';
import { LucideIcon } from 'lucide-react';
import { BaseModel } from './base.model';

export class SelectOption<T = any> extends BaseModel {

  label: string = null;

  value: T = null;

  icon: LucideIcon = null;

  disabled = false;

  constructor(entity: Partial<SelectOption<T>> = null) {
    super(entity);
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
  }
}
