import { ObjectUtils } from '@utils/object.utils';
import { v4 as uuidv4 } from 'uuid';
import { ColumnDescriptorSchema } from '../schema/column-descriptor.schema';
import { ColumnType } from './enums/column-type.enum';

export class ColumnDescriptor {

  id = uuidv4();

  name: string = null;

  title: string = null;

  type: ColumnType = null;

  error: boolean = false;

  constructor(entity: Partial<ColumnDescriptor> = null) {
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
    this.type = ColumnType.toClientObject(entity?.type?.id ?? entity?.type);
  }

  static toClientObject(obj: any): ColumnDescriptor {
    if (!obj) {
      return null;
    }
    return new ColumnDescriptor(obj);
  }

  toServerObject(): ColumnDescriptorSchema {
    return {
      id: this.id,
      name: this.name,
      title: this.title,
      type: this.type?.id,
    };
  }
}