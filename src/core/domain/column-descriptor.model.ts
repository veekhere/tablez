import { ObjectUtils } from '@utils/object.utils';
import { ColumnDescriptorSchema } from '../schema/column-descriptor.schema';
import { BaseModel } from './base.model';
import { ColumnType } from './enums/column-type.enum';

export class ColumnDescriptor extends BaseModel {

  name: string = null;

  title: string = null;

  type: ColumnType = null;

  error: boolean = false;

  constructor(entity: Partial<ColumnDescriptor> = null) {
    super(entity);
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