import { ObjectUtils } from '@utils/object.utils';
import { LucideIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export class SelectOption<T = any> {

  id = uuidv4();

  label: string = null;

  value: T = null;

  icon: LucideIcon = null;

  disabled = false;

  constructor(entity: Partial<SelectOption<T>> = null) {
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
  }
}
