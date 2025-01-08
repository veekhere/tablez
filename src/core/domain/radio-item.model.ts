import { ObjectUtils } from '@utils/object.utils';
import { v4 as uuidv4 } from 'uuid';

export class RadioItem {
  /**
   * Element ID.
   */
  id: string = uuidv4();

  value: string = null;

  label: string = null;

  description?: string = null;

  disabled?: boolean = false;

  disabledDescription?: string = null;

  constructor(item: Partial<RadioItem> = null) {
    if (item) {
      ObjectUtils.constructorFiller(this, item);
    }
  }
}
