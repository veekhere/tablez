import { ObjectUtils } from '@utils/object.utils';
import { v4 as uuidv4 } from 'uuid';

export class BaseModel {

  id = uuidv4();

  constructor(model: Partial<BaseModel> = null) {
    if (!model) {
      return;
    }
    ObjectUtils.constructorFiller(this, model);
  }
}
