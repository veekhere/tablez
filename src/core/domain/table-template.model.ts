import { ObjectUtils } from '@utils/object.utils';
import { BaseModel } from './base.model';
import { ColumnDescriptor } from './column-descriptor.model';

export class TableTemplate extends BaseModel {

  name: string = null;

  description: string = null;

  structure: ColumnDescriptor[] = null;

  constructor(entity: Partial<TableTemplate> = null) {
    super(entity);
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
    this.structure = entity.structure?.map((descriptor) => new ColumnDescriptor(descriptor)) ?? [];
  }
}
